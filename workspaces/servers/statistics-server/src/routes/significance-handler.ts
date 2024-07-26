import { db, eq } from 'pertentodb';
import { Experiments } from 'pertentodb';
import { getRawData } from './_sql-queries';
import redisClient from 'redis-client';

export const significanceHandler = async (c) => {
  console.log('significanceHandler');
  const { experimentId } = c.req.param();
  const { goal, currency } = c.req.query();

  if (+experimentId === 3449) {
    console.log(experimentId, goal, currency);
  }

  const experiment = c.experiment;

  if (+experimentId === 3449) {
    console.log(experiment.variants.map((v) => ({ id: v.id, visitorCount: v.visitorCount })));
  }

  const stats = await getRawData(experimentId, goal, currency);
  const significance = crunchStats({ experiment, stats, currency, goal });
  if (+experimentId === 3449) {
    console.log('experimentId', experimentId);
    console.log('significance', significance);
    console.log('stats', stats);
  }
  c.significance = significance;
  return c.json(significance);
};

export const significanceMiddleware = async (c, next) => {
  const { experimentId } = c.req.param();
  if (+experimentId === 3449) {
    return next();
  }
  const { goal, currency } = c.req.query();
  const redisKey = `PERTENTO:STATISTICS:SIGNIFICANCE:${experimentId}:${goal}:${currency}`;

  const significanceMemo = await redisClient.get(redisKey);
  if (significanceMemo) {
    const { significance, timestamp } = JSON.parse(significanceMemo);
    if (Date.now() - timestamp < 10 * 60 * 1000) {
      return c.json(significance);
    }
  }

  await next();

  const { significance } = c;
  const redisData = { significance, timestamp: Date.now() };
  redisClient.set(redisKey, JSON.stringify(redisData));
};

export const crunchStats = ({ experiment, stats, goal }) => {
  const { variants: dbVariants } = experiment;
  const originalVariant = dbVariants.find((variant) => variant.name === 'Original');
  const significance = {};

  for (let stat of stats) {
    significance[stat.variant_id] = significance[stat.variant_id] || {};
    const statObj = significance[stat.variant_id];
    if (+stat.variant_id === originalVariant.id) {
      statObj.isOriginal = true;
    }
    if (goal === 'Conversions') {
      statObj.conversions = statObj.conversions || 0;
      statObj.conversions += +stat.conversions;
    }
    if (goal === 'Revenue') {
      statObj.revenue = statObj.revenue || 0;
      statObj.revenue += +stat.revenue / 100;
    }
  }

  const originalStat = significance[originalVariant.id];
  for (let [variantId, statObj] of Object.entries(significance)) {
    const variant = dbVariants.find((variant) => variant.id === +variantId);
    statObj.variantId = variant.id;
    statObj.sessions = variant.visitorCount.count;
    if (goal === 'Conversions') {
      statObj.average = getAverage(statObj.conversions, statObj.sessions, true);
      if (!statObj.isOriginal) {
        statObj.difference = statObj.conversions - originalStat?.conversions;
        statObj.improvement = diff(statObj.conversions, originalStat?.conversions);
      }
    }
    if (goal === 'Revenue') {
      statObj.average = statObj.revenue / statObj.sessions;
      if (!statObj.isOriginal) {
        statObj.difference = statObj.revenue - originalStat?.revenue;
        statObj.improvement = diff(statObj.revenue, originalStat?.revenue);
      }
    }
  }

  return significance;
};

const getAverage = (diff, total, isPercent) => Math.round((diff / total) * 10000) / (isPercent ? 100 : 1) || 0;

const diff = (target, against) => (!against ? 100 : +(getAverage(target, against, true) - 100).toFixed(2));
