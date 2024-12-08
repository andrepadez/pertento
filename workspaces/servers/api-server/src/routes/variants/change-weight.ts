import { db, eq, Variants, ActivityLog } from 'pertentodb';

export const changeWeightHandler = async (c) => {
  const { variantId } = c.req.param();
  const { weight, testing } = c.req.body;
  const where = eq(Variants.id, variantId);
  const dbVariant = await db.query.Variants.findFirst({ where });
  const [newVariant] = await db.update(Variants).set({ weight }).where(where).returning();

  if (testing) return c.json(newVariant);

  const message =
    dbVariant.weight !== null
      ? `changed ${dbVariant.name} Variant weight from  ${dbVariant.weight / 100}% to ${weight / 100}%`
      : `set  ${dbVariant.name} Variant weight to ${weight / 100}%`;

  await db.insert(ActivityLog).values({
    experimentId: dbVariant.experimentId,
    userId: c.user.id,
    createdAt: new Date().valueOf(),
    message,
  });
  return c.json(newVariant);
};
