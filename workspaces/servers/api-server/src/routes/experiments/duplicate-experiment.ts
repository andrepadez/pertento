import { db, eq, Experiments, Variants, Changes } from 'pertentodb';
import { UrlTargeting, DeviceTargeting, ActivityLog } from 'pertentodb';

export const duplicateExperimentHandler = async (c) => {
  const { experimentId } = c.req.param();
  const { name, testing } = c.req.body;
  const { id: createdBy } = c.user;
  const now = new Date().valueOf();
  const where = eq(Experiments.id, experimentId);
  return db.transaction(async (tx) => {
    let [dbExp] = await tx.select().from(Experiments).where(where);
    delete dbExp.id;
    delete dbExp.startsAt;
    delete dbExp.endsAt;
    delete dbExp.finalVisitorCount;
    delete dbExp.deleted;
    delete dbExp.archived;
    dbExp = { ...dbExp, name, createdBy, status: 'Draft', createdAt: now, updatedAt: now };

    const [newExp] = await tx.insert(Experiments).values(dbExp).returning();
    const dbVariants = await tx.select().from(Variants).where(eq(Variants.experimentId, experimentId));

    for (let dbVariant of dbVariants) {
      const dbChanges = await tx.select().from(Changes).where(eq(Changes.variantId, dbVariant.id));
      delete dbVariant.id;
      dbVariant.experimentId = newExp.id;
      if (dbVariant.weight === 0) dbVariant.weight = null;
      const [newVariant] = await tx.insert(Variants).values(dbVariant).returning();
      if (dbChanges.length === 0) continue;
      dbVariant.experimentId = newExp.id;
      dbVariant.createdAt = now;
      dbVariant.updatedAt = now;
      await tx.insert(Changes).values(
        dbChanges.map((dbChange) => {
          delete dbChange.id;
          return {
            ...dbChange,
            variantId: newVariant.id,
            createdAt: now,
            updatedAt: now,
          };
        }),
      );
    }

    const dbUrlTargets = await db.select().from(UrlTargeting).where(eq(UrlTargeting.experimentId, experimentId));

    if (dbUrlTargets.length > 0) {
      await tx.insert(UrlTargeting).values(
        dbUrlTargets.map((dbUrlTarget) => {
          delete dbUrlTarget.id;
          return {
            ...dbUrlTarget,
            experimentId: newExp.id,
          };
        }),
      );
    }

    const dbDeviceTargets = await db
      .select()
      .from(DeviceTargeting)
      .where(eq(DeviceTargeting.experimentId, experimentId));

    if (dbDeviceTargets.length > 0) {
      await tx.insert(DeviceTargeting).values(
        dbDeviceTargets.map((dbDeviceTarget) => {
          delete dbDeviceTarget.id;
          return {
            ...dbDeviceTarget,
            experimentId: newExp.id,
          };
        }),
      );
    }

    if (testing) return c.json(newExp);

    const log = {
      userId: c.user.id,
      experimentId: newExp.id,
      createdAt: now,
      message: 'duplicated experiment',
    };

    await tx.insert(ActivityLog).values(log);

    return c.json(newExp);
  });
};
