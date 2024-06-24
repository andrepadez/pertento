import { db, eq, UrlTargeting, ActivityLog } from 'pertentodb';

export const editUrlTargetingHandler = async (c) => {
  const now = new Date().valueOf();
  const { urlTargetingId } = c.req.param();
  const { testing } = c.req.body;

  const where = eq(UrlTargeting.id, urlTargetingId);

  const [dbUrlTargeting] = await db.update(UrlTargeting).set(c.body).where(where).returning();

  const { url, condition, experimentId } = dbUrlTargeting;

  const log = {
    experimentId,
    userId: c.user.id,
    createdAt: now,
    message: `Updated Url Targeting to ${condition} ${url}`,
  };

  if (!testing) {
    await db.insert(ActivityLog).values(log);
  }

  return c.json(dbUrlTargeting);
};
