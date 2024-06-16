import { db, eq, Experiments, ActivityLog } from 'pertentodb';
const { MONITORING_URL } = process.env;

export const endExperimentHandler = async (c) => {
  const { experimentId } = c.req.param();

  const [experiment] = await db
    .update(Experiments)
    .set({ endsAt: new Date().valueOf(), status: 'Ended' })
    .where(eq(Experiments.id, experimentId))
    .returning();

  if (c.body.testing) return c.json(experiment);

  const log = {
    experimentId,
    userId: c.user.id,
    createdAt: new Date().valueOf(),
    message: `Ended experiment`,
  };

  await db.insert(ActivityLog).values(log);

  return c.json(experiment);
};
