import { db, eq, Experiments, Variants, VisitorCount, Changes, ActivityLog } from 'pertentodb';

export const deployExperimentHandler = async (c) => {
  const { experimentId, variantId } = c.req.param();
  const now = new Date().valueOf();

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
      .values({ ...variant, deployed: now, weight: 10000, name: `${variant.name} (DEPLOYED)` })
      .returning();

    await tx.insert(VisitorCount).values({ experimentId, variantId: deployedVariant.id, count: 0 });

    if (variant.changes.length > 0) {
      await tx.insert(Changes).values(variant.changes.map((change) => ({ ...change, variantId: deployedVariant.id })));
    }

    const log = {
      experimentId,
      userId: c.user.id,
      createdAt: now,
      message: `Deployed variant ${variant.name} (${variant.id})`,
    };

    await tx.insert(ActivityLog).values(log);

    return c.json({ ok: true });
  });
};
