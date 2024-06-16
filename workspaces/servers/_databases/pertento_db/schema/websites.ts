import { relations } from 'drizzle-orm';
import { bigint, bigserial, boolean, pgTable, varchar } from 'drizzle-orm/pg-core';
import { Companies } from './companies';
import { Experiments } from './experiments';
import { GanEventTags, GanProperties } from './google-analytics';

export const Websites = pgTable('websites', {
  id: bigserial('id', { mode: 'number' }).primaryKey(),
  companyId: bigint('company_id', { mode: 'number' }),
  parentCompanyId: bigint('parent_company_id', { mode: 'number' }),
  url: varchar('url', { length: 256 }).notNull(),
  ganPropertyId: bigint('gan_property_id', { mode: 'number' }),
  ganMeasurementId: varchar('gan_measurement_id', { length: 32 }),
  serverContainerUrl: varchar('server_container_url', { length: 256 }),
  deleted: boolean('deleted').default(false),
});

export const WebsitesRelations = relations(Websites, ({ many, one }) => ({
  company: one(Companies, {
    fields: [Websites.companyId],
    references: [Companies.id],
  }),
  experiments: many(Experiments),
  ganProperty: one(GanProperties, {
    fields: [Websites.ganPropertyId],
    references: [GanProperties.id],
  }),
  ganPropertyTags: many(GanEventTags),
}));
