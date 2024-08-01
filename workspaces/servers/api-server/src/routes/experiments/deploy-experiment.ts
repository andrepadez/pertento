import { db, eq, Experiments, Variants, Changes, ActivityLog } from 'pertentodb';

export const deployExperimentHandler = async (c) => {
  const { experimentId, variantId } = c.req.param();

  return db.transaction(async (tx) => {
    const [experiment] = await tx
      .update(Experiments)
      .set({ status: 'Deployed' })
      .where(eq(Experiments.id, experimentId))
      .returning();

    const variant = await tx.query.Variants.findFirst({
      where: eq(Variants.id, variantId),
      columns: { id: false },
      with: {
        changes: {
          columns: { id: false },
        },
      },
    });

    const [deployedVariant] = await tx
      .insert(Variants)
      .values({ ...variant, deployed: true, weight: 10000, name: `${variant.name} (DEPLOYED)` })
      .returning();

    await tx.insert(Changes).values(variant.changes.map((change) => ({ ...change, variantId: deployedVariant.id })));

    const log = {
      experimentId,
      userId: c.user.id,
      createdAt: new Date().valueOf(),
      message: `Deployed variant ${variant.name} (${variant.id})`,
    };

    await tx.insert(ActivityLog).values(log);

    return c.json({ ok: true });
  });
};
