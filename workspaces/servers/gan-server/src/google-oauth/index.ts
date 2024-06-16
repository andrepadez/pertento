import { Hono, userMiddleware } from 'hono';
import { userMiddleware } from 'middlewares';
import { oauthListHandler } from './oauth-list-handler';
import { recheckForEditPermissionsHandler } from './recheck-permissions-handler';
import { refreshEmailHandler } from './refresh-email-handler';
import { connectAccountHandler } from './connect-account-handler';

export const googleOauthRouter = new Hono();

googleOauthRouter.get('/', oauthListHandler);
googleOauthRouter.get('/recheck-permissions/:ganPropertyId', recheckForEditPermissionsHandler);
googleOauthRouter.post('/refresh', refreshEmailHandler);
googleOauthRouter.post('/connect', connectAccountHandler);
