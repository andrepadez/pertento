import { pgTable, pgEnum, text, json, bigint, bigserial } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { Experiments } from './experiments';

export const CookieTargeting = pgTable('cookie_targeting', {
  id: bigserial('id', { mode: 'number' }).primaryKey(),
  cookieName: text('cookie_name'),
  cookieValues: json('cookie_values'),
  experimentId: bigint('experiment_id', { mode: 'number' }),
});

export const CookieTargetingRelations = relations(CookieTargeting, ({ one }) => ({
  experiment: one(Experiments, {
    fields: [CookieTargeting.experimentId],
    references: [Experiments.id],
  }),
}));
