import { Hono } from 'hono-server';

export const experimentsRouter = new Hono();

experimentsRouter.get('/', async (c) => {
  return c.render(
    <div class="flex flex-col gap-10">
      <h1 class="">Experiments</h1>
    </div>,
  );
});
