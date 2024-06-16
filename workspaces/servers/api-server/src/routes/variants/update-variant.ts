import { db, eq, Variants } from 'pertentodb';

export const updateVariantHandler = async (c) => {
  const { variantId } = c.req.param();
  const values = { ...c.body, updatedAt: Date.now() };
  const where = eq(Variants.id, variantId);
  const [variant] = await db.update(Variants).set(values).where(where).returning();
  return c.json(variant);
};
