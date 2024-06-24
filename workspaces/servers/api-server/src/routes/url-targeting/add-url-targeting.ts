import { db, eq, UrlTargeting, ActivityLog } from 'pertentodb';

export const addUrlTargetingHandler = async (c) => {
  const now = new Date().valueOf();
  const payload = c.req.body;
  const newTargeting = { ...payload, createdBy: c.user.id, createdAt: now, updatedAt: now };

  const [dbUrlTargeting] = await db.insert(UrlTargeting).values(newTargeting).returning();

  const { condition, url, experimentId, testing } = payload;
  const log = {
    experimentId,
    userId: c.user.id,
    createdAt: now,
    message: `Added Url Targeting: ${condition} ${url}`,
  };

  if (!testing) {
    await db.insert(ActivityLog).values(log);
  }

  return c.json(dbUrlTargeting);
};
