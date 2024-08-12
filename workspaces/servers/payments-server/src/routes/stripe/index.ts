import { Hono } from 'hono';
import Stripe from 'stripe';
const { STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET } = process.env;
const stripe = new Stripe(STRIPE_SECRET_KEY);

export const stripeRouter = new Hono();

stripeRouter.post('/webhook', async (ctx) => {
  const signature = ctx.req.header('stripe-signature');
  console.log(signature);
  if (!signature) return ctx.text('No signature', 400);
  const body = await ctx.req.text();
  const event = await stripe.webhooks.constructEventAsync(body, signature, STRIPE_WEBHOOK_SECRET);
  console.log(event.type);
  // console.log(event.data.object);
  console.log(Object.keys(event));
  return ctx.json({ webhook: 'received' });
});
