import { HonoServer, userMiddleware } from 'hono-server';
import { statisticsRouter } from './routes';

const { STATISTICS_PORT: PORT } = process.env;

const app = HonoServer(PORT, 'Statistics Server');

app.use('/', (c) => c.json({ pertentoStatisticsServer: 'v0.1.0' }));

app.use(userMiddleware);
app.route('/', statisticsRouter);
