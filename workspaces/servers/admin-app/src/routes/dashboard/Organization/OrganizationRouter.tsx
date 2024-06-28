import { Hono } from 'hono-server';

export const organizationRouter = new Hono();

organizationRouter.get('/', async (c) => {
  return c.render(
    <div class="flex flex-col gap-10">
      <h1 class="">Organization</h1>
    </div>,
  );
});
