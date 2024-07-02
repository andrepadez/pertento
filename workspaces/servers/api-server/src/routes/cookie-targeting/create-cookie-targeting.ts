import { db, eq, CookieTargeting, ActivityLog } from 'pertentodb';

export const createCookieTargetingHandler = async (c) => {
  const { id, cookieName, cookieValues: cookieValuesStr, experimentId, testing } = c.req.body;

  const cookieValues = cookieValuesStr
    .split('\n')
    .filter(Boolean)
    .map((v) => v.trim());

  const now = new Date().valueOf();
  const newTargeting = { experimentId, cookieName, cookieValues, createdBy: c.user.id, createdAt: now };
  let targeting = null;
  if (id) {
    [targeting] = await db.update(CookieTargeting).set(newTargeting).where(eq(CookieTargeting.id, id)).returning();
  } else {
    [targeting] = await db.insert(CookieTargeting).values(newTargeting).returning();
  }

  const message = id ? `Updated cookie targeting (${cookieName})` : `Added cookie targeting (${cookieName})`;

  const log = {
    experimentId,
    userId: c.user.id,
    createdAt: now,
    message: message,
  };
  if (!testing) {
    await db.insert(ActivityLog).values(log);
  }

  return c.json(targeting);
};
