import { Hono } from 'hono';
import { userMiddleware } from 'hono-server';
import { webhookHandler } from './webhook-handler';
import { paymentPlansHandler } from './payment-plans-handler';
import { db, eq, Subscriptions } from 'pertentodb';

export const stripeRouter = new Hono();

stripeRouter.post('/webhook', webhookHandler);

stripeRouter.use(userMiddleware);

stripeRouter.get('/payment-plans/:companyType', paymentPlansHandler);

stripeRouter.get('/subscription', async (ctx) => {
  const { user } = ctx;
  const subscription = await db.query.Subscriptions.findFirst({
    where: eq(Subscriptions.companyId, user.companyId),
  });
  return ctx.json(subscription);
});
