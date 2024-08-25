import Stripe from 'stripe';
import { db, eq, Companies, Subscriptions, Invoices } from 'pertentodb';
const { STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET } = process.env;
const stripe = new Stripe(STRIPE_SECRET_KEY);

export const webhookHandler = async (ctx) => {
  const signature = ctx.req.header('stripe-signature');
  if (!signature) return ctx.text('No signature', 400);
  const body = await ctx.req.text();
  const event = await stripe.webhooks.constructEventAsync(body, signature, STRIPE_WEBHOOK_SECRET);
  // console.log(event.type);
  // return ctx.json({ webhook: 'received' });
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
    // console.log('updated SUBSCRIPTION', subscription);
    const [invoice] = await db.insert(Invoices).values(updatedCustomerData).returning();
    // console.log('inserted INVOICE', invoice);
    queue.delete(customerId);
  }
};

const events = {
  customer: {
    subscription: {
      updated: async (data) => {
        // console.log('customer.subscription.created');
        const { customer: customerId, id: subscriptionId, items } = data;
        const { current_period_end, current_period_start, created } = data;
        const { product: productId, interval } = items.data[0].plan;

        const finalObject = {
          subscriptionId,
          productId,
          interval,
          currentPeriodStart: current_period_start * 1000,
          currentPeriodEnd: current_period_end * 1000,
          createdAt: created * 1000,
          updatedAt: Date.now(),
        };

        const [subscription] = await db
          .update(Subscriptions)
          .set(finalObject)
          .where(eq(Subscriptions.customerId, customerId))
          .returning();

        //TODO: send email to customer
      },
      // updated: async (data) => {
      //   console.log('customer.subscription.updated');
      //   console.log(data.items.data[0]);
      // },
    },
  },
  // checkout: {
  //   session: {
  //     completed: async (data) => {
  //       // console.log('checkout.session.complete');
  //       finalize(data.customer, {});
  //     },
  //   },
  // },
  invoice: {
    payment_succeeded: async (data) => {
      const { id, customer, amount_due, invoice_pdf, created, subscription } = data;

      const dbSubscription = await db.query.Subscriptions.findFirst({
        where: eq(Subscriptions.customerId, customer),
      });

      const finalData = {
        companyId: dbSubscription.companyId,
        customerId: customer,
        invoiceId: id,
        subscriptionId: subscription,
        paid: true,
        amount: amount_due,
        invoicePDF: invoice_pdf,
        createdAt: created * 1000,
      };

      const [invoice] = await db.insert(Invoices).values(finalData).returning();
    },
  },
};

/*

customer.subscription.updated

customer.created
product.created
plan.created
payment_method.attached
price.created
charge.succeeded
customer.updated
customer.subscription.created
payment_intent.created
payment_intent.succeeded
invoice.finalized
invoice.paid
invoice.created
invoice.payment_succeeded
customer.subscription.updated

*/
