import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';
export * from './schema';
export * from 'drizzle-orm';
export * from 'drizzle-orm/pg-core';

const { STATISTICS_DB_URL = 'postgres://postgres:postgres@127.0.0.1:5432/pertento_statistics' } = process.env;
const pgClient = postgres(STATISTICS_DB_URL);

const statisticsdb = drizzle(pgClient, { schema });

export { statisticsdb, pgClient };
