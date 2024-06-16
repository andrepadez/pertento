import { HonoServer } from 'hono-server';
import { apiRouter } from './routes';
import * as errors from 'custom-errors';
const { API_PORT: PORT } = process.env;

const app = HonoServer(PORT, 'API Server');
app.use('/', (c) => c.json({ pertentoAPIServer: 'v0.1.0' }));
app.route('/', apiRouter);
