import { paymentPlansNames } from 'misc/payment-plans';
import { pgTable, pgEnum, json, varchar } from 'drizzle-orm/pg-core';
import { bigint, bigserial } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

export const subscriptionPlanEnum = pgEnum('subscription_name', paymentPlansNames);
export const frequencyEnum = pgEnum('frequency', ['monthly', 'yearly']);

export const Subscriptions = pgTable('subscriptions', {
  id: bigserial('id', { mode: 'number' }).primaryKey(),
  companyId: bigint('company_id', { mode: 'number' }),
  customerId: varchar('customer_id', { length: 32 }),
  subscriptionId: varchar('subscription_id', { length: 256 }),
  subscriptionName: subscriptionPlanEnum('subscription_name'),
  frequency: frequencyEnum('frequency'),
  // trialStart: bigint('trial_start', { mode: 'number' }),
  // trialEnd: bigint('trial_end', { mode: 'number' }),
  currentPeriodStart: bigint('current_period_start', { mode: 'number' }),
  currentPeriodEnd: bigint('current_period_end', { mode: 'number' }),
  canceledAt: bigint('canceled_at', { mode: 'number' }),
  // canceledAtPeriodEnd: bigint('canceled_at_period_end', { mode: 'number' }),
  // createdAt: bigint('created_at', { mode: 'number' }),
  // updatedAt: bigint('updated_at', { mode: 'number' }),
});
