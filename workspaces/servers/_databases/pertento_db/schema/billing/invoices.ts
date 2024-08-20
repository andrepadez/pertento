import { pgTable, pgEnum, json, varchar } from 'drizzle-orm/pg-core';
import { bigint, bigserial, boolean } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

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
