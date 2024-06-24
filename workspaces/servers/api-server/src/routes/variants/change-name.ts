import { db, eq, Variants, ActivityLog } from 'pertentodb';

export const changeNameHandler = async (c) => {
  const { variantId } = c.req.param();
  const { name, testing } = c.req.body;
  const variant = await db.query.Variants.findFirst({ where: eq(Variants.id, variantId) });
  const [dbVariant] = await db.update(Variants).set({ name }).where(eq(Variants.id, variantId)).returning();

  if (testing) return c.json(dbVariant);

  await db.insert(ActivityLog).values({
    experimentId: dbVariant.experimentId,
    userId: c.user.id,
    createdAt: new Date().valueOf(),
    message: `changed Variant ${variant.name} to ${name}`,
  });

  return c.json(dbVariant);
};
