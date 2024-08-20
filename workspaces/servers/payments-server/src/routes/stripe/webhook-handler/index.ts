import Stripe from 'stripe';
import { db, eq, Companies, Subscriptions } from 'pertentodb';
import { paymentPlansByPriceId } from 'misc/payment-plans';
const { STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET } = process.env;
const stripe = new Stripe(STRIPE_SECRET_KEY);

// console.log(paymentPlansByPriceId);

export const webhookHandler = async (ctx) => {
  const signature = ctx.req.header('stripe-signature');
  if (!signature) return ctx.text('No signature', 400);
  const body = await ctx.req.text();
  const event = await stripe.webhooks.constructEventAsync(body, signature, STRIPE_WEBHOOK_SECRET);

  const eventArr = event.type.split('.');
  let eventIndex = 0;
  let handler = events[eventArr[eventIndex]];
  while (handler) {
    const key = eventArr[++eventIndex];
    if (!handler[key]) break;
    if (typeof handler[key] === 'function') {
      handler[key](event.data.object);
      break;
    }
    handler = handler[key];
  }

  return ctx.json({ webhook: 'received' });
};

const queue = new Map();

const finalize = async (customerId, data) => {
  const customerData = queue.get(customerId) || { count: 0 };
  const updatedCustomerData = { ...customerData, ...data, count: customerData.count + 1 };
  queue.set(customerId, updatedCustomerData);
  console.log(updatedCustomerData);
  if (updatedCustomerData.count === 3) {
    const [subscription] = await db.insert(Subscriptions).values(updatedCustomerData).returning();
    console.log('inserted', subscription);
    queue.delete(customerId);
  }
};

const events = {
  customer: {
    created: async (data) => {
      console.log('customer.created');
      const { id: customerId, email } = data;
      finalize(customerId, { customerId, email });
    },
    subscription: {
      created: async (data) => {
        console.log('customer.subscription.created');
        const { customer: customerId, id: subscriptionId, current_period_end, current_period_start, items } = data;
        const { id: priceId } = items.data[0].price;
        const paymentPlan = paymentPlansByPriceId[priceId];

        const finalObject = {
          subscriptionId,
          currentPeriodStart: current_period_start * 1000,
          currentPeriodEnd: current_period_end * 1000,
          subscriptionName: paymentPlan.name,
          frequency: paymentPlan.frequency,
        };

        finalize(customerId, finalObject);
      },
    },
  },
  invoice: {
    payment_succeeded: async (data) => {
      // finalize(data);
    },
  },
  checkout: {
    session: {
      completed: async (data) => {
        console.log('checkout.session.complete');
        const { customer: customerId, client_reference_id, customer_details } = data;

        const userCompany = await db.query.Companies.findFirst({
          where: eq(Companies.id, client_reference_id),
        });

        const desiredName = `${userCompany.friendlyName} (${userCompany.id})`;

        if (desiredName !== customer_details.name) {
          await stripe.customers.update(customerId, {
            name: desiredName,
          });
        }
        console.log('--------------------------');
        finalize(customerId, { companyId: userCompany.id });
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
