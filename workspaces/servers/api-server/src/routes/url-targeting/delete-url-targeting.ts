import { db, eq, UrlTargeting, ActivityLog } from 'pertentodb';

export const deleteUrlTargetingHandler = async (c) => {
  const now = new Date().valueOf();
  const { urlTargetingId } = c.req.param();
  const { testing } = c.body;

  const where = eq(UrlTargeting.id, urlTargetingId);
  const returning = {
    url: UrlTargeting.url,
    condition: UrlTargeting.condition,
    experimentId: UrlTargeting.experimentId,
  };
  const [dbUrlTargeting] = await db.delete(UrlTargeting).where(where).returning(returning);

  const { url, condition, experimentId } = dbUrlTargeting;

  const log = {
    experimentId,
    userId: c.id,
    createdAt: now,
    message: `Removed Url Targeting: ${condition} ${url}`,
  };

  if (!testing) {
    await db.insert(ActivityLog).values(log);
  }

  return c.json({ ok: true });
};
