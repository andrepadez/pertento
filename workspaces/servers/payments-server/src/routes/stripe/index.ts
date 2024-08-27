import { Hono } from 'hono';
import { userMiddleware } from 'hono-server';
import { webhookHandler } from './webhook-handler';
import { paymentPlansHandler } from './payment-plans-handler';
import { createCheckoutSessionHandler } from './checkout-session';
import { db, eq, asc, desc, Subscriptions, Invoices } from 'pertentodb';

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

stripeRouter.get('/invoices', async (ctx) => {
  const { companyId } = ctx.user;
  const invoices = await db.query.Invoices.findMany({
    where: eq(Invoices.companyId, companyId),
    orderBy: desc(Invoices.createdAt),
  });

  return ctx.json(invoices);
});

stripeRouter.post('/checkout-session', createCheckoutSessionHandler);
