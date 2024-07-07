import { db, eq, desc, Experiments, ActivityLog } from 'pertentodb';
import { experimentsByIdCache } from '@/cache';

export const experimentByIdMiddleware = async (ctx, next) => {
  const { experimentId } = ctx.req.param();
  const { nextUrl } = ctx.var;

  let experiment = experimentsByIdCache.get(+experimentId);
  if (!experiment) {
    experiment = await db.query.Experiments.findFirst({
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
        cookieTargeting: true,
        urlTargeting: true,
      },
    });
    experimentsByIdCache.set(+experimentId, experiment);
  }

  const { websiteId, companyId } = experiment;
  const org = nextUrl.searchParams.get('org');
  const ws = nextUrl.searchParams.get('ws');
  if (+org === companyId && +ws === websiteId) {
    ctx.set('experiment', experiment);
    return next();
  }

  nextUrl.searchParams.set('org', companyId);
  nextUrl.searchParams.set('ws', websiteId);
  return ctx.redirect(nextUrl.toString());
};
