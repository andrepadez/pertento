import { db, eq, Experiments, Variants, ActivityLog, Websites, GanProperties } from 'pertentodb';

export const createExperimentHandler = async (ctx) => {
  return db.transaction(async (tx) => {
    const { testing, ...payload } = ctx.req.body;
    const newExperiment = { ...payload };
    newExperiment.createdBy = ctx.user.id;
    newExperiment.createdAt = newExperiment.updatedAt = new Date().valueOf();

    const [experiment] = await tx.insert(Experiments).values(newExperiment).returning();

    const { id: experimentId, websiteId, companyId, parentCompanyId } = experiment;
    const newVariant = {
      experimentId,
      websiteId,
      companyId,
      parentCompanyId,
      createdBy: ctx.user.id,
    };

    const ots = new Date().valueOf();
    const originalValues = { name: 'Original', ...newVariant, createdAt: ots, updatedAt: ots };
    const [original] = await tx.insert(Variants).values(originalValues).returning();

    for (let variant of newExperiment.variants) {
      const vts = new Date().valueOf();
      const { name, redirectUrl } = variant;
      const variantValues = { name, redirectUrl, ...newVariant, createdAt: vts, updatedAt: vts };
      const [dbVariant] = await tx.insert(Variants).values(variantValues).returning();
    }

    if (testing) return ctx.json(experiment);

    const log = {
      experimentId: experiment.id,
      userId: ctx.user.id,
      createdAt: new Date().valueOf(),
      message: `Created experiment`,
    };

    await tx.insert(ActivityLog).values(log);

    return ctx.json(experiment);
  });
};
