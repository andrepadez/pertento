import { db, eq, Experiments } from 'pertentodb';
import { refreshPropertyTags } from 'jobs/google-analytics/property-tags';

export const archiveExperimentHandler = async (c) => {
  const { experimentId } = c.req.param();
  const now = new Date().valueOf();
  const where = eq(Experiments.id, experimentId);
  const [experiment] = await db.update(Experiments).set({ archived: now }).where(where).returning();
  return c.json(experiment);
};
