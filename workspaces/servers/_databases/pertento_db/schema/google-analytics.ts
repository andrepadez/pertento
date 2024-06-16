import { pgTable, serial, varchar, text, json } from 'drizzle-orm/pg-core';
import { smallint, bigint, bigserial, uuid } from 'drizzle-orm/pg-core';
import { integer, numeric, decimal, boolean } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { Websites } from './websites';

export const GanOauth = pgTable('gan_oauth', {
  email: varchar('email', { length: 256 }).primaryKey(),
  companyId: bigint('company_id', { mode: 'number' }),
  name: varchar('name', { length: 36 }),
  image: varchar('image', { length: 256 }),
  refreshToken: varchar('refresh_token', { length: 256 }),
  accountsCount: smallint('accounts_count', { mode: 'number' }),
  lastRefreshed: bigint('last_refreshed', { mode: 'number' }),
  refreshCount: smallint('refresh_count', { mode: 'number' }).default(0),
});

export const GanProperties = pgTable('gan_properties', {
  id: bigint('property_id', { mode: 'number' }).primaryKey(),
  name: varchar('display_name', { length: 256 }),
  type: varchar('property_type', { length: 128 }),
  accountId: bigint('account_id', { mode: 'number' }),
  hasEditPermission: json('has_edit_permission').default([]),
  hasReadPermission: json('has_read_permission').default([]),
});

export const GanEventTags = pgTable('gan_event_tags', {
  id: bigserial('id', { mode: 'number' }).primaryKey(),
  ganPropertyId: bigint('gan_property_id', { mode: 'number' }),
  name: varchar('name', { length: 256 }),
  isConversion: boolean('is_conversion').default(false),
});

export const GanEventTagsRelations = relations(GanEventTags, ({ one }) => ({
  website: one(Websites, {
    fields: [GanEventTags.ganPropertyId],
    references: [Websites.ganPropertyId],
  }),
}));
