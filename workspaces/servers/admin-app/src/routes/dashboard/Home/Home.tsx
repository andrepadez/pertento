import { Hono } from 'hono-server';

export const homeRouter = new Hono();

homeRouter.get('/', async (ctx) => {
  const { website, company } = ctx.var;
  return ctx.render(
    <div class="flex flex-col gap-10">
      <h1 class="">Home</h1>
      <div>{company.friendlyName}</div>
      <div>{website.url}</div>
    </div>,
  );
});
