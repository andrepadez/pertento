import { pgTable, pgEnum, json, varchar } from 'drizzle-orm/pg-core';
import { bigint, bigserial } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { Companies } from 'pertentodb';
// import { paymentPlansNames } from 'misc/payment-plans';

export const Subscriptions = pgTable('subscriptions', {
  id: bigserial('id', { mode: 'number' }).primaryKey(),
  companyId: bigint('company_id', { mode: 'number' }),
  customerId: varchar('customer_id', { length: 32 }),
  email: varchar('email', { length: 256 }),
  subscriptionId: varchar('subscription_id', { length: 256 }),
  productId: varchar('product_id', { length: 256 }),
  interval: varchar('interval', { length: 16 }),
  currentPeriodStart: bigint('current_period_start', { mode: 'number' }),
  currentPeriodEnd: bigint('current_period_end', { mode: 'number' }),
  canceledAt: bigint('canceled_at', { mode: 'number' }),
  // trialStart: bigint('trial_start', { mode: 'number' }),
  // trialEnd: bigint('trial_end', { mode: 'number' }),
  // canceledAtPeriodEnd: bigint('canceled_at_period_end', { mode: 'number' }),
  createdAt: bigint('created_at', { mode: 'number' }),
  updatedAt: bigint('updated_at', { mode: 'number' }),
});

// export const SubscriptionRelations = relations(Subscriptions, ({ many, one }) => ({
//   company: one(Companies, {
//     fields: [Subscriptions.companyId],
//     references: [Companies.id],
//   }),
// }));
