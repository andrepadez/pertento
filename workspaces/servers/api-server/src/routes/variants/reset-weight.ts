import { db, eq, Variants, ActivityLog } from 'pertentodb';

export const resetWeightHandler = async (c) => {
  const { variantId } = c.req.param();
  const where = eq(Variants.id, variantId);
  const dbVariant = await db.query.Variants.findFirst({ where });
  const [newVariant] = await db.update(Variants).set({ weight: null }).where(where).returning();

  if (c.body.testing) return c.json(newVariant);

  const message = `resetted weight for variant ${dbVariant.name}`;
  await db.insert(ActivityLog).values({
    experimentId: dbVariant.experimentId,
    userId: c.user.id,
    createdAt: new Date().valueOf(),
    message,
  });

  return c.json(newVariant);
};
