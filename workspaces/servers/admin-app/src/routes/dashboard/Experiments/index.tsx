import { Hono } from 'hono-server';
import { experimentsMiddleware } from '@/middlewares/experiments';
import { experimentsPageHandler, experimentsListHandler } from './experimentList';

export const experimentsRouter = new Hono();
experimentsRouter.use(experimentsMiddleware);

experimentsRouter.get('/', experimentsPageHandler);
experimentsRouter.get('/:experimentId', experimentsListHandler);
