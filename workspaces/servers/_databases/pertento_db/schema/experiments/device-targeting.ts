import { pgTable, pgEnum, text } from 'drizzle-orm/pg-core';
import { bigint, bigserial } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { Experiments } from './experiments';
import { DEVICE_TYPES } from 'misc';

export const deviceTypeEnum = pgEnum('device', DEVICE_TYPES);

export const DeviceTargeting = pgTable('device_targeting', {
  id: bigserial('id', { mode: 'number' }).primaryKey(),
  device: deviceTypeEnum('device'),
  experimentId: bigint('experiment_id', { mode: 'number' }),
  createdBy: bigint('created_by', { mode: 'number' }),
  createdAt: bigint('created_at', { mode: 'number' }),
});

export const DeviceTargetingRelations = relations(DeviceTargeting, ({ one }) => ({
  experiment: one(Experiments, {
    fields: [DeviceTargeting.experimentId],
    references: [Experiments.id],
  }),
}));
