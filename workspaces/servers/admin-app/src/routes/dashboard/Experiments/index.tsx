import { Hono } from 'hono-server';
import { experimentsMiddleware } from '@/middlewares/experiments';
import { experimentByIdMiddleware } from '@/middlewares/experiment-by-id';
import { experimentsPageHandler, experimentsListHandler } from './experimentList';

export const experimentsRouter = new Hono();
experimentsRouter.use(experimentsMiddleware);

experimentsRouter.get('/', experimentsPageHandler);
experimentsRouter.get('/list', experimentsListHandler);

experimentsRouter.use('/:experimentId', experimentByIdMiddleware);
experimentsRouter.get('/:experimentId', (ctx) => {
  const { experiment } = ctx.var;
  return ctx.render(
    <div>
      <h1>{experiment.name}</h1>
      <h2>{experiment.id}</h2>
    </div>,
  );
});
