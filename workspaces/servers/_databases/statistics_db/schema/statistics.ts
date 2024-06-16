import { pgTable, text, varchar, integer, json } from 'drizzle-orm/pg-core';
import { bigint, bigserial } from 'drizzle-orm/pg-core';
import { Variants, Experiments } from './';
import { relations } from 'drizzle-orm';

export const Statistics = pgTable('statistics', {
  id: bigserial('id', { mode: 'number' }).primaryKey(),
  websiteId: bigint('website_id', { mode: 'number' }),
  experimentId: bigint('experiment_id', { mode: 'number' }),
  variantId: bigint('variant_id', { mode: 'number' }),
  from: bigint('from', { mode: 'number' }),
  currencyCode: varchar('currency_code', { length: 4 }),
  count: integer('count'),
  value: bigint('value', { mode: 'number' }),
});
