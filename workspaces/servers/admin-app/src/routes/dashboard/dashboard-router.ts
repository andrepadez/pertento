import { Hono } from 'hono-server';
import { userAuthenticatedMiddleware } from '@/middlewares/user-authenticated';
import { orgAndWebsiteMiddleware } from '@/middlewares/orgsAndWebsites';
import { nextUrlMiddleware } from '@/middlewares/next-url';
import { dashboardRenderer } from './_layout';
import { homeRouter } from './Home';
import { experimentsRouter } from './Experiments';
import { monitorRouter } from './Monitor';
import { websitesRouter } from './Websites';
import { organizationRouter } from './Organization';
import { googleAnalyticsRouter } from './GoogleAnalytics';
import { accountRouter } from './Account';

export const dashboardRouter = new Hono();
dashboardRouter.use(nextUrlMiddleware);
dashboardRouter.use(userAuthenticatedMiddleware);
dashboardRouter.use(dashboardRenderer);

dashboardRouter.use('*', orgAndWebsiteMiddleware);

dashboardRouter.route('/', homeRouter);
dashboardRouter.route('/experiments', experimentsRouter);
dashboardRouter.route('/monitor', monitorRouter);
dashboardRouter.route('/websites', websitesRouter);
dashboardRouter.route('/organization', organizationRouter);
dashboardRouter.route('/google-analytics', googleAnalyticsRouter);
dashboardRouter.route('/account', accountRouter);
