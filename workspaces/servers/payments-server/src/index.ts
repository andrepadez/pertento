import { HonoServer, userMiddleware } from 'hono-server';
import { paymentsRouter } from './routes';

const { PAYMENTS_PORT: PORT } = process.env;

const app = HonoServer(PORT, 'Payments Server');

app.use('/', (c) => c.json({ pertentoPaymentsServer: 'v0.1.0' }));

app.route('/', paymentsRouter);
