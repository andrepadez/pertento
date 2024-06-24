import { db, eq, Variants, ActivityLog } from 'pertentodb';

export const setMaxWeightHandler = async (c) => {
  const { variantId } = c.req.param();
  const where = eq(Variants.id, variantId);
  const dbVariant = await db.query.Variants.findFirst({ where });

  const { name, id, experimentId } = dbVariant;
  const experimentWhere = eq(Variants.experimentId, experimentId);
  await db.update(Variants).set({ weight: null }).where(experimentWhere);
  const [updatedVariant] = await db.update(Variants).set({ weight: 10000 }).where(where).returning();

  if (c.req.body.testing) return c.json(updatedVariant);

  const message = `set 100% weight for variant ${dbVariant.name}`;
  await db.insert(ActivityLog).values({
    experimentId: dbVariant.experimentId,
    userId: c.user.id,
    createdAt: new Date().valueOf(),
    message,
  });
  return c.json(updatedVariant);
};
