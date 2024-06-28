import { Hono } from 'hono-server';
import { userMiddleware } from './user-middleware';
import { dashboardRenderer } from './_layout';
import { homeRouter } from './Home';
import { experimentsRouter } from './Experiments';
import { monitorRouter } from './Monitor';
import { websitesRouter } from './Websites';
import { organizationRouter } from './Organization';

export const dashboardRouter = new Hono();
dashboardRouter.use(userMiddleware);
dashboardRouter.use(dashboardRenderer);

dashboardRouter.route('/', homeRouter);
dashboardRouter.route('/experiments', experimentsRouter);
dashboardRouter.route('/monitor', monitorRouter);
dashboardRouter.route('/websites', websitesRouter);
dashboardRouter.route('/organization', organizationRouter);
