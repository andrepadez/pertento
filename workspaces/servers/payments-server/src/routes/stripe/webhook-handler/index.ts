import Stripe from 'stripe';
import { db, eq, Companies, Subscriptions, Invoices } from 'pertentodb';
// import { paymentPlansByPriceId } from 'misc/payment-plans';
const { STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET } = process.env;
const stripe = new Stripe(STRIPE_SECRET_KEY);

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
  if (updatedCustomerData.count === 3) {
    const [subscription] = await db
      .update(Subscriptions)
      .set(updatedCustomerData)
      .where(eq(Subscriptions.customerId, customerId))
      .returning();
    console.log('updated SUBSCRIPTION', subscription);
    const [invoice] = await db.insert(Invoices).values(updatedCustomerData).returning();
    console.log('inserted INVOICE', invoice);
    queue.delete(customerId);
  }
};

const events = {
  customer: {
    subscription: {
      created: async (data) => {
        console.log('customer.subscription.created');
        const { customer: customerId, id: subscriptionId, current_period_end, current_period_start, items } = data;
        const { product: productId, interval } = items.data[0].plan;

        const finalObject = {
          subscriptionId,
          productId,
          interval,
          currentPeriodStart: current_period_start * 1000,
          currentPeriodEnd: current_period_end * 1000,
        };

        console.log('finalObject', finalObject);

        finalize(customerId, finalObject);
      },
    },
  },
  checkout: {
    session: {
      completed: async (data) => {
        console.log('checkout.session.complete');
        finalize(data.customer, {});
      },
    },
  },
  invoice: {
    payment_succeeded: async (data) => {
      const { id, customer, amount_due, invoice_pdf, created } = data;

      const dbSubscription = await db.query.Subscriptions.findFirst({
        where: eq(Subscriptions.customerId, customer),
      });

      const finalData = {
        companyId: dbSubscription.companyId,
        invoiceId: id,
        customerId: customer,
        paid: true,
        amount: amount_due,
        invoicePDF: invoice_pdf,
        createdAt: created * 1000,
      };
      finalize(customer, finalData);
    },
  },
};

/*
export const Invoices = pgTable('invoices', {
  id: bigserial('id', { mode: 'number' }).primaryKey(),
  companyId: bigint('company_id', { mode: 'number' }),
  customerId: varchar('customer_id', { length: 32 }),
  invoiceId: varchar('invoice_id', { length: 256 }),
  subscriptionId: varchar('subscription_id', { length: 256 }),
  amount: bigint('amount', { mode: 'number' }),
  paid: boolean('paid'),
  invoicePDF: varchar('invoice_pdf', { length: 1024 }),
  createdAt: bigint('created_at', { mode: 'number' }),
});
*/

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
