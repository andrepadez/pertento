import { HonoServer, userMiddleware } from 'hono-server';
import { googleOauthRouter } from './google-oauth';
import { googleAnalyticsRouter } from './google-analytics';

const { GAN_PORT: PORT } = process.env;

const app = HonoServer(PORT, 'GAN Server');

app.use('/', (c) => c.json({ pertentoGanServer: 'v0.1.0' }));

app.use(userMiddleware);
app.route('/google-oauth', googleOauthRouter);
app.route('/google-analytics', googleAnalyticsRouter);
