import { db, eq, Experiments, Variants, ActivityLog } from 'pertentodb';

export const finishSetupHandler = async (c) => {
  const { experimentId } = c.req.param();
  const { editorUrl, variantName, testing } = c.body;

  const [experiment] = await db
    .update(Experiments)
    .set({ editorUrl })
    .where(eq(Experiments.id, experimentId))
    .returning();

  if (!testing) {
    await db.insert(ActivityLog).values({
      experimentId,
      userId: c.user.id,
      createdAt: new Date().valueOf(),
      message: `Updated Editor URL`,
    });
  }

  const { websiteId, companyId, parentCompanyId } = experiment;
  const newVariant = {
    experimentId,
    websiteId,
    companyId,
    parentCompanyId,
    createdBy: c.user.id,
  };

  const ots = new Date().valueOf();
  const originalValues = { name: 'Original', ...newVariant, createdAt: ots, updatedAt: ots };
  const [original] = await db.insert(Variants).values(originalValues).returning();

  const vts = new Date().valueOf();
  const variantValues = { name: variantName, ...newVariant, createdAt: vts, updatedAt: vts };
  const [variant] = await db.insert(Variants).values(variantValues).returning();

  if (!testing) {
    await db.insert(ActivityLog).values({
      experimentId,
      userId: c.user.id,
      createdAt: vts,
      message: `created Variant ${variantName}`,
    });
  }

  experiment.variants = [original, variant];

  return c.json(experiment);
};
