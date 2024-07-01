import { db, eq, asc, count, isNull, isNotNull, and, desc, Experiments } from 'pertentodb';
import { EXPERIMENTS } from '@/cache';

export const experimentsMiddleware = async (c, next) => {
  const { website } = c.var;

  if (EXPERIMENTS.has(website.id)) {
    const experiments = EXPERIMENTS.get(website.id);
    c.set('experiments', experiments);
    return next();
  }

  const dbExperiments = await db.query.Experiments.findMany({
    where: and(eq(Experiments.websiteId, website.id), isNull(Experiments.deleted)),
    orderBy: asc(Experiments.createdAt),
    with: { visitorCounts: true, variants: true },
  });

  const experiments = dbExperiments.reduce(
    (acc, experiment) => {
      experiment.sessions = experiment.visitorCounts.reduce((acc, vc) => acc + vc.count, 0);
      acc.All.push(experiment);
      if (!!experiment.archived) {
        acc.Archived.push(experiment);
        return acc;
      }
      acc[experiment.status].push(experiment);
      return acc;
    },
    { All: [], Archived: [], Running: [], Draft: [], Ended: [], total: dbExperiments.length },
  );

  EXPERIMENTS.set(website.id, experiments);
  c.set('experiments', experiments);

  return next();
};
