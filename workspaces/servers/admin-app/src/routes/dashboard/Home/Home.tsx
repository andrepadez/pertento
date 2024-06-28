import { Hono } from 'hono-server';

export const homeRouter = new Hono();

homeRouter.get('/', async (c) => {
  return c.render(
    <div class="flex flex-col gap-10">
      <h1 class="">Home</h1>
    </div>,
  );
});
