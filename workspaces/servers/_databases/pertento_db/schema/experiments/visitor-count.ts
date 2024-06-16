import { pgTable, varchar, text } from 'drizzle-orm/pg-core';
import { smallint, bigint, bigserial } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { Variants, Experiments } from './';

export const VisitorCount = pgTable('visitor_count', {
  id: bigserial('id', { mode: 'number' }).primaryKey(),
  experimentId: bigint('experiment_id', { mode: 'number' }),
  variantId: bigint('variant_id', { mode: 'number' }),
  count: bigint('count', { mode: 'number' }).default(0),
});

export const VisitorCountRelations = relations(VisitorCount, ({ one }) => ({
  variant: one(Variants, {
    fields: [VisitorCount.variantId],
    references: [Variants.id],
  }),
  experiment: one(Experiments, {
    fields: [VisitorCount.experimentId],
    references: [Experiments.id],
  }),
}));
