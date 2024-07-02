import { Hono } from 'hono-server';

export const monitorRouter = new Hono();

monitorRouter.get('/', async (ctx) => {
  return ctx.render(
    <div class="flex flex-col gap-10">
      <h1 class="">Monitor</h1>
    </div>,
  );
});
