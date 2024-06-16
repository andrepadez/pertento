const { pgTable, text } = require('drizzle-orm/pg-core');
const { bigint, bigserial } = require('drizzle-orm/pg-core');
import { relations } from 'drizzle-orm';
import { Experiments } from './experiments';
import { Users } from '../users';

export const ActivityLog = pgTable('activity_log', {
  id: bigserial('id', { mode: 'number' }).primaryKey(),
  experimentId: bigint('experiment_id', { mode: 'number' }),
  userId: bigint('user_id', { mode: 'number' }),
  createdAt: bigint('created_at', { mode: 'number' }),
  message: text('message'),
});

export const ActivityLogRelations = relations(ActivityLog, ({ many, one }) => ({
  experiment: one(Experiments, {
    fields: [ActivityLog.experimentId],
    references: [Experiments.id],
  }),
  user: one(Users, {
    fields: [ActivityLog.userId],
    references: [Users.id],
  }),
}));
