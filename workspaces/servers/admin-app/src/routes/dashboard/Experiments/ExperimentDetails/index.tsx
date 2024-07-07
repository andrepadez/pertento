import { Hono } from 'hono';

export const experimentDetailsRouter = new Hono();

experimentDetailsRouter.get('/', async (ctx) => {
  return ctx.html(<h1></h1>);
});
