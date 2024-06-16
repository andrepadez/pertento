import { db, eq, Experiments } from 'pertentodb';
import { refreshPropertyTags } from 'jobs/google-analytics/property-tags';

export const deleteExperimentHandler = async (c) => {
  const { experimentId } = c.req.param();
  const now = new Date().valueOf();
  const where = eq(Experiments.id, experimentId);
  const [experiment] = await db.update(Experiments).set({ deleted: now }).where(where).returning();
  return c.json(experiment);
};
