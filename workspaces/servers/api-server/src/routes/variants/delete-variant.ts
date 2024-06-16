import { db, eq, Variants, ActivityLog } from 'pertentodb';

export const deleteVariantHandler = async (c) => {
  const { variantId } = c.req.param();
  const where = eq(Variants.id, variantId);
  const [{ name, experimentId }] = await db.delete(Variants).where(where).returning();

  if (c.body.testing) return c.json({ ok: true });

  const log = {
    experimentId,
    userId: c.user.id,
    createdAt: new Date().valueOf(),
    message: `deleted Variant ${name}`,
  };
  await db.insert(ActivityLog).values(log);

  return c.json({ ok: true });
};
