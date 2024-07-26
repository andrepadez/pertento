import { db, sql, eq } from 'pertentodb';
import { Experiments } from 'pertentodb';
import { statisticsdb, Statistics } from 'statisticsdb';
import redisClient from 'redis-client';

let runningExperiments = [];

export const experimentsMonitorHandler = async (c) => {
  const experiments = runningExperiments.filter(
    (exp) => c.user.companyId === exp.website.companyId || c.user.companyId === exp.website.parentCompanyId,
  );
  c.experiments = experiments;
  return c.json(experiments);
};

export const experimentsMonitorMiddleware = async (c, next) => {
  const redisKey = `PERTENTO:EXPERIMENTS_MONITOR:${c.user.companyId}`;
  const experimentsMonitorMemo = await redisClient.get(redisKey);
  if (experimentsMonitorMemo) {
    const { experiments, timestamp } = JSON.parse(experimentsMonitorMemo);
    if (Date.now() - timestamp < 2 * 60 * 1000) {
      return c.json(experiments);
    }
  }

  await next();

  const { experiments } = c;
  const redisData = { experiments, timestamp: Date.now() };
  redisClient.set(redisKey, JSON.stringify(redisData), 'EX');
};

const experimentsTicker = async () => {
  const startTime = performance.now();
  const experiments = await db.query.Experiments.findMany({
    where: eq(Experiments.status, 'Running'),
    columns: { id: true, name: true },
    with: {
      website: {
        columns: { id: true, url: true, companyId: true, parentCompanyId: true },
      },
      variants: {
        columns: { id: true, name: true, weight: true },
        with: { visitorCount: { columns: { count: true } } },
      },
    },
  });

  const experimentIds = experiments.map((exp) => exp.id);

  const query = sql`
    SELECT 
      ${Statistics.variantId}, 
      ${Statistics.experimentId},
      ${Statistics.currencyCode}, 
      SUM(${Statistics.count}) AS conversions, 
      SUM(${Statistics.value}) AS revenue
    FROM 
      ${Statistics}
    WHERE 
      ${Statistics.experimentId} IN (${sql.raw(experimentIds.join(','))}) 
    GROUP BY 
      ${Statistics.variantId}, 
      ${Statistics.experimentId},
      ${Statistics.currencyCode};
  `;

  const stats = await statisticsdb.execute(query);

  const statsByExp = stats.reduce((acc, stat) => {
    const { variant_id, experiment_id, currency_code, conversions, revenue } = stat;
    acc[stat.experiment_id] = acc[stat.experiment_id] || [];
    acc[stat.experiment_id].push({
      variantId: +variant_id,
      experimentId: +experiment_id,
      currencyCode: currency_code,
      conversions: +conversions,
      revenue: +revenue,
    });
    return acc;
  }, {});

  const mappedExps = experiments.map((exp) => ({
    ...exp,
    stats: statsByExp[exp.id] || [],
  }));

  runningExperiments = mappedExps;
  setTimeout(experimentsTicker, 5 * 60 * 1000);
};

experimentsTicker();
