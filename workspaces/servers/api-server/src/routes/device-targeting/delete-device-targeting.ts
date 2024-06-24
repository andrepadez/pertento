import { db, eq, DeviceTargeting, ActivityLog } from 'pertentodb';

export const deleteDeviceTargetingHandler = async (c) => {
  const { deviceTargetingId } = c.req.param();
  const { testing } = c.req.body;

  const dbDeviceTargeting = await db.query.DeviceTargeting.findFirst({
    where: eq(DeviceTargeting.id, deviceTargetingId),
  });

  await db.delete(DeviceTargeting).where(eq(DeviceTargeting.id, deviceTargetingId));

  const log = {
    experimentId: dbDeviceTargeting.experimentId,
    userId: c.user.id,
    createdAt: new Date().valueOf(),
    message: `Deleted targeting for ${dbDeviceTargeting.device}`,
  };

  if (!testing) {
    await db.insert(ActivityLog).values(log);
  }

  return c.json({ ok: true });
};
