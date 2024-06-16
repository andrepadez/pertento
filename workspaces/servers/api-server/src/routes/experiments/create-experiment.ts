import { db, eq, Experiments, ActivityLog, Websites, GanProperties } from 'pertentodb';

export const createExperimentHandler = async (c) => {
  const { testing, ...payload } = c.body;
  const newExperiment = { ...payload };
  newExperiment.createdBy = c.user.id;
  newExperiment.createdAt = newExperiment.updatedAt = new Date().valueOf();
  const [experiment] = await db.insert(Experiments).values(newExperiment).returning();

  if (testing) return c.json(experiment);

  const log = {
    experimentId: experiment.id,
    userId: c.user.id,
    createdAt: new Date().valueOf(),
    message: `Created experiment`,
  };

  await db.insert(ActivityLog).values(log);

  return c.json(experiment);
};
