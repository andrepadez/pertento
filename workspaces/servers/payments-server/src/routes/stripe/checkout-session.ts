import { Stripe } from 'stripe';
import { db, eq, Subscriptions } from 'pertentodb';
const { VITE_DASHBOARD_URL, STRIPE_SECRET_KEY } = process.env;
console.log('VITE_DASHBOARD_URL', VITE_DASHBOARD_URL);

const stripe = Stripe(STRIPE_SECRET_KEY);

export const createCheckoutSessionHandler = async (ctx) => {
  const { priceId } = ctx.req.body;
  console.log('checkout-session', priceId, ctx.user);

  const dbSubscription = await db.query.Subscriptions.findFirst({
    where: eq(Subscriptions.companyId, ctx.user.companyId),
  });

  const { customerId } = dbSubscription;

  const session = await stripe.checkout.sessions.create({
    customer: customerId,
    success_url: `${VITE_DASHBOARD_URL}/organization?screen=billing`,
    mode: 'subscription',
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
  });

  return ctx.json({ url: session.url });
};
