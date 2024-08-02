import { pgTable, varchar, text, boolean } from 'drizzle-orm/pg-core';
import { smallint, bigint, bigserial } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { Experiments, Changes, VisitorCount } from './';

export const Variants = pgTable('variants', {
  id: bigserial('id', { mode: 'number' }).primaryKey(),
  name: varchar('name', { length: 256 }).notNull(),
  experimentId: bigint('experiment_id', { mode: 'number' }),
  websiteId: bigint('website_id', { mode: 'number' }),
  companyId: bigint('company_id', { mode: 'number' }),
  parentCompanyId: bigint('parent_company_id', { mode: 'number' }),
  ganAudienceId: bigint('gan_audience_id', { mode: 'number' }),
  createdBy: bigint('created_by', { mode: 'number' }),
  weight: smallint('weight', { mode: 'number' }),
  globalJavascript: text('global_javascript'),
  globalCSS: text('global_css'),
  deployed: bigint('deployed', { mode: 'number' }),
  createdAt: bigint('created_at', { mode: 'number' }),
  updatedAt: bigint('updated_at', { mode: 'number' }),
});

export const VariantsRelations = relations(Variants, ({ one, many }) => ({
  changes: many(Changes),
  experiment: one(Experiments, {
    fields: [Variants.experimentId],
    references: [Experiments.id],
  }),
  visitorCount: one(VisitorCount, {
    fields: [Variants.id],
    references: [VisitorCount.variantId],
  }),
}));
