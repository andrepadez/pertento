import { Hono } from 'hono-server';

export const homeRouter = new Hono();

homeRouter.get('/', async (c) => {
  const { website, company } = c.var;
  return c.render(
    <div class="flex flex-col gap-10">
      <h1 class="">Home</h1>
      <div>{company.friendlyName}</div>
      <div>{website.url}</div>
    </div>,
  );
});
