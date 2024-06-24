import { db, eq, desc, Experiments, ActivityLog } from 'pertentodb';
import * as errors from 'custom-errors';

export const canExperiment = async (c, next) => {
  let experimentId = c.req.param('experimentId') || c.req.body?.experimentId;
  if (!experimentId || isNaN(experimentId)) return next();

  const experiment = await db.query.Experiments.findFirst({
    where: eq(Experiments.id, experimentId),
    with: {
      website: {
        with: {
          company: true,
        },
      },
      variants: { with: { changes: true, visitorCount: { columns: { count: true } }, experiment: {} } },
      activityLog: { with: { user: true }, orderBy: desc(ActivityLog.createdAt) },
      deviceTargeting: true,
      urlTargeting: true,
    },
  });

  if (!experiment) throw errors.NOT_FOUND();

  const { id: companyId, parentCompanyId } = experiment.website.company;
  if (![companyId, parentCompanyId].includes(c.user.companyId)) {
    if (c.user.role !== 'Super Admin') {
      throw errors.FORBIDDEN();
    }
  }

  c.experiment = experiment;

  return next();
};
