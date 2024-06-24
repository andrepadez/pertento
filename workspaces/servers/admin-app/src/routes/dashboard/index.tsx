import { Hono } from 'hono-server';
import { userMiddleware } from './user-middleware';
import { dashboardRenderer } from '@/Layouts/Dashboard';
import { Counter } from './Counter';

export const dashboardRouter = new Hono();
dashboardRouter.use(userMiddleware);
dashboardRouter.use(dashboardRenderer);

dashboardRouter.get('/', async (c) => {
  return c.render(
    <div class="mt-12 flex flex-col gap-10 text-center">
      <h1 class="text-6xl">Admin fullstack HTMX App</h1>
      <Counter count={5} />
    </div>,
  );
});

dashboardRouter.post('/increment/:count', async (c) => {
  const { count } = c.req.param();
  return c.html(<Counter count={+count + 1} />);
});

dashboardRouter.post('/decrement/:count', async (c) => {
  const { count } = c.req.param();
  return c.html(<Counter count={+count - 1} />);
});
