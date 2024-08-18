import Stripe from 'stripe';
import { db, eq, Companies } from 'pertentodb';
const { STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET } = process.env;
const stripe = new Stripe(STRIPE_SECRET_KEY);

export const webhookHandler = async (ctx) => {
  const signature = ctx.req.header('stripe-signature');
  if (!signature) return ctx.text('No signature', 400);
  const body = await ctx.req.text();
  const event = await stripe.webhooks.constructEventAsync(body, signature, STRIPE_WEBHOOK_SECRET);
  console.log(event.type);

  const eventArr = event.type.split('.');
  let eventIndex = 0;
  let handler = events[eventArr[eventIndex]];
  while (handler) {
    const key = eventArr[++eventIndex];
    if (typeof handler[key] === 'function') {
      handler[key](event.data.object);
      break;
    }
    if (!handler[key]) break;
    handler = handler[key];
  }

  return ctx.json({ webhook: 'received' });
};

const events = {
  customer: {
    // created: (data) => {
    //   console.log('customer.created');
    //   console.log(data);
    // },
  },
  checkout: {
    session: {
      completed: async (data) => {
        console.log('checkout.session.complete');
        const { customer, client_reference_id, customer_details } = data;
        console.log({ customer, client_reference_id, name: customer_details.name });

        const userCompany = await db.query.Companies.findFirst({
          where: eq(Companies.id, client_reference_id),
        });

        const desiredName = `${userCompany.friendlyName} (${userCompany.id})`;

        if (desiredName !== customer_details.name) {
          await stripe.customers.update(customer, {
            name: desiredName,
          });
        }
      },
    },
  },
};

/*
{
  id: "cus_QgOYHcGdyqyFqr",
  object: "customer",
  address: {
    city: null,
    country: "PT",
    line1: null,
    line2: null,
    postal_code: null,
    state: null,
  },
  balance: 0,
  created: 1723959269,
  currency: null,
  default_source: null,
  delinquent: false,
  description: null,
  discount: null,
  email: "andre.padez@pertento.ai",
  invoice_prefix: "D7952E22",
  invoice_settings: {
    custom_fields: null,
    default_payment_method: null,
    footer: null,
    rendering_options: null,
  },
  livemode: false,
  metadata: {},
  name: "André Padez",
  phone: null,
  preferred_locales: [ "en-GB" ],
  shipping: null,
  tax_exempt: "none",
  test_clock: null,
}
*/

// charge.succeeded
// customer.subscription.updated
// payment_intent.succeeded
// invoice.created
// invoice.finalized
// invoice.updated
// invoice.paid
// invoice.payment_succeeded
// customer.created
// payment_method.attached
// customer.updated
// checkout.session.completed
// payment_intent.created
// customer.subscription.created
