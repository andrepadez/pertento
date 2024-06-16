import { pgTable, pgEnum, json, varchar } from 'drizzle-orm/pg-core';
import { bigint, bigserial } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { EXPERIMENT_STATUSES } from 'misc';
import { Websites } from '../websites';
import { Variants, DeviceTargeting, UrlTargeting, ActivityLog, VisitorCount } from './';

export const experimentStatusEnum = pgEnum('status', EXPERIMENT_STATUSES);

export const Experiments = pgTable('experiments', {
  id: bigserial('id', { mode: 'number' }).primaryKey(),
  name: varchar('name', { length: 256 }).notNull(),
  createdBy: bigint('created_by', { mode: 'number' }),
  websiteId: bigint('website_id', { mode: 'number' }),
  companyId: bigint('company_id', { mode: 'number' }),
  parentCompanyId: bigint('parent_company_id', { mode: 'number' }),
  editorUrl: varchar('editor_url', { length: 512 }),
  startsAt: bigint('starts_at', { mode: 'number' }),
  endsAt: bigint('ends_at', { mode: 'number' }),
  status: experimentStatusEnum('status').default(EXPERIMENT_STATUSES[0]),
  eventGoals: json('event_goals').default([]),
  createdAt: bigint('created_at', { mode: 'number' }),
  updatedAt: bigint('updated_at', { mode: 'number' }),
  finalVisitorCount: json('final_visitor_count'),
  deleted: bigint('deleted', { mode: 'number' }),
  archived: bigint('archived', { mode: 'number' }),
});

export const ExperimentsRelations = relations(Experiments, ({ many, one }) => ({
  website: one(Websites, {
    fields: [Experiments.websiteId],
    references: [Websites.id],
  }),
  deviceTargeting: many(DeviceTargeting),
  urlTargeting: many(UrlTargeting),
  variants: many(Variants),
  activityLog: many(ActivityLog),
  visitorCounts: many(VisitorCount),
}));
