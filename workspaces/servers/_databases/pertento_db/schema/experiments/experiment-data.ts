import { pgTable, varchar, text, json } from 'drizzle-orm/pg-core';
import { smallint, bigint, bigserial } from 'drizzle-orm/pg-core';

export const ExperimentData = pgTable('experiment_data', {
  id: bigserial('id', { mode: 'number' }).primaryKey(),
  timestamp: bigint('timestamp', { mode: 'number' }),
  websiteId: bigint('website_id', { mode: 'number' }),
  experimentId: bigint('experiment_id', { mode: 'number' }),
  variantId: bigint('variant_id', { mode: 'number' }),
  event: varchar('event', { mode: 'string', length: 255 }),
  data: json('data'),
});
