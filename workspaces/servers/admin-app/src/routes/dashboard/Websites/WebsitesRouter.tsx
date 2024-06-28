import { Hono } from 'hono-server';

export const websitesRouter = new Hono();

websitesRouter.get('/', async (c) => {
  return c.render(
    <div class="flex flex-col gap-10">
      <h1 class="">Websites</h1>
    </div>,
  );
});
