import { Hono } from 'hono-server';
import { experimentsMiddleware } from '@/middlewares/experiments';
import { experimentByIdMiddleware } from '@/middlewares/experiment-by-id';
import { experimentsPageHandler, experimentsListHandler } from './ExperimentList';
import { experimentsConfigRouter } from './ExperimentsConfig';

export const experimentsRouter = new Hono();
experimentsRouter.use(experimentsMiddleware);

experimentsRouter.get('/', experimentsPageHandler);
experimentsRouter.get('/list', experimentsListHandler);

experimentsRouter.use('/:experimentId', experimentByIdMiddleware);
experimentsRouter.use('/:experimentId/*', experimentByIdMiddleware);

experimentsRouter.route('/:experimentId', experimentsConfigRouter);
