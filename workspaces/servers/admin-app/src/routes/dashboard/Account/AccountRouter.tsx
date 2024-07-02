import { Hono } from 'hono-server';

export const accountRouter = new Hono();

accountRouter.get('/', async (ctx) => {
  return ctx.render(
    <div class="flex flex-col gap-10">
      <h1 class="">Account</h1>
    </div>,
  );
});
