import { HonoServer, userAgent } from 'hono-server';
import { eventsHandler, eventsMiddleware } from './handlers/events';
import { testDataHandler, testDataMiddleware } from './handlers/test-data';
import { experimentVariantsHandler } from './handlers/experiment-variants';
import { visitorsHandler, visitorsMiddleware } from './handlers/visitors';
const { EXPERIMENTS_PORT: PORT } = process.env;

const app = HonoServer(PORT, 'Experiments Server');
app.use(userAgent());
app.get('/', (c) => c.json({ pertentoExperimentsServer: 'v0.1.0' }));
app.get('/experiment-data', experimentVariantsHandler);

app.post('/events', eventsMiddleware, eventsHandler);
app.post('/visitors', visitorsMiddleware, visitorsHandler);
app.post('/test-data', testDataMiddleware, testDataHandler);
