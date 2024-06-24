import { db, eq, Experiments, ActivityLog } from 'pertentodb';

export const updateExperimentHandler = async (c) => {
  const { experimentId } = c.req.param();
  const where = eq(Experiments.id, experimentId);
  await db.update(Experiments).set(c.req.body).where(where);

  return c.json({ ok: true });
};
