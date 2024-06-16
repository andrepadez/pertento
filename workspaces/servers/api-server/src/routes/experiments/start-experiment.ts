import { db, eq, Variants, Experiments, ActivityLog, VisitorCount, Websites } from 'pertentodb';
// import { createAudienceForVariant } from '../../jobs/google-analytics/create-audience';

export const startExperimentHandler = async (c) => {
  const { experimentId } = c.req.param();
  const { variantWeights, startsAt = new Date().valueOf(), testing } = c.body;

  return db.transaction(async (tx) => {
    const variantIds = variantWeights.map((v) => v.id);
    const experiment = await db.query.Experiments.findFirst({
      where: eq(Experiments.id, experimentId),
    });

    for (let variantId of variantIds) {
      await tx.insert(VisitorCount).values({ experimentId, variantId, count: 0 });
    }

    for (let variant of variantWeights) {
      const where = eq(Variants.id, variant.id);
      await tx.update(Variants).set({ weight: variant.weight }).where(where);
    }

    const where = eq(Experiments.id, experimentId);
    const values = { startsAt, status: 'Running' };
    const [updatedExperiment] = await tx.update(Experiments).set(values).where(where).returning();

    if (testing) return c.json(updatedExperiment);

    const activity = {
      userId: c.user.id,
      experimentId,
      createdAt: startsAt,
      message: 'started the experiment',
    };

    await tx.insert(ActivityLog).values(activity);

    return c.json(updatedExperiment);
  });
};
