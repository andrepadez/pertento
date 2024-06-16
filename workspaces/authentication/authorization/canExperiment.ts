import { db, eq, desc, Experiments, ActivityLog } from 'pertentodb';

export const canExperiment = async (req, res, next) => {
  const experimentId = req.params.experimentId || req.body.experimentId;

  const experiment = await db.query.Experiments.findFirst({
    where: eq(Experiments.id, experimentId),
    with: {
      website: {
        with: {
          company: true,
        },
      },
      variants: { with: { changes: true } },
      activityLog: { with: { user: true }, orderBy: desc(ActivityLog.createdAt) },
      deviceTargeting: true,
      urlTargeting: true,
    },
  });

  const { id: companyId, parentCompanyId } = experiment.website.company;
  if (![companyId, parentCompanyId].includes(req.user.companyId)) {
    if (req.user.role !== 'Super Admin') {
      return res.status(403).send('FORBIDDEN');
    }
  }

  req.experiment = experiment;

  return next();
};
