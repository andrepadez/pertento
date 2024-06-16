import { db, Variants, ActivityLog } from 'pertentodb';

export const createVariantHandler = async (c) => {
  const variant = {
    ...c.body,
    createdBy: c.user.id,
  };

  const vts = new Date().valueOf();
  const variantValues = { ...variant, createdAt: vts, updatedAt: vts };
  const [newVariant] = await db.insert(Variants).values(variantValues).returning();

  if (c.body.testing) return c.json(newVariant);

  const log = {
    experimentId: variant.experimentId,
    userId: c.user.id,
    createdAt: vts,
    message: `created Variant ${variant.name}`,
  };

  await db.insert(ActivityLog).values(log);

  return c.json(newVariant);
};
