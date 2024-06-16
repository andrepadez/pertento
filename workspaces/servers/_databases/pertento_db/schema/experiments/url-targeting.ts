import { pgTable, pgEnum, text } from 'drizzle-orm/pg-core';
import { bigint, bigserial } from 'drizzle-orm/pg-core';
import { Experiments } from './experiments';
import { relations } from 'drizzle-orm';
import { URL_TARGETING_CONDITIONS } from 'misc';

export const urlTargetingConditionsEnum = pgEnum('condition', URL_TARGETING_CONDITIONS);

export const UrlTargeting = pgTable('url_targeting', {
  id: bigserial('id', { mode: 'number' }).primaryKey(),
  url: text('url').notNull(),
  condition: urlTargetingConditionsEnum('condition'),
  experimentId: bigint('experiment_id', { mode: 'number' }),
  createdBy: bigint('created_by', { mode: 'number' }),
  createdAt: bigint('created_at', { mode: 'number' }),
  updatedAt: bigint('updated_at', { mode: 'number' }),
});

export const UrlTargetingRelations = relations(UrlTargeting, ({ one }) => ({
  experiment: one(Experiments, {
    fields: [UrlTargeting.experimentId],
    references: [Experiments.id],
  }),
}));
