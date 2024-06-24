import { db, eq, DeviceTargeting, ActivityLog } from 'pertentodb';

export const createDeviceTargetingHandler = async (c) => {
  const now = new Date().valueOf();
  const { device, experimentId, testing } = c.req.body;
  const newTargeting = { device, experimentId, createdBy: c.user.id, createdAt: now };
  const [targeting] = await db.insert(DeviceTargeting).values(newTargeting).returning();

  const log = {
    experimentId,
    userId: c.user.id,
    createdAt: now,
    message: `Added ${device} targeting`,
  };
  if (!testing) {
    await db.insert(ActivityLog).values(log);
  }

  return c.json(targeting);
};
