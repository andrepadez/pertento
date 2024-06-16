import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';
export * from './schema';
export * from 'drizzle-orm';
export * from 'drizzle-orm/pg-core';

const { POSTGRES_URL = 'postgres://postgres:postgres@127.0.0.1:5432/pertento' } = process.env;
const pgClient = postgres(POSTGRES_URL);

const db = drizzle(pgClient, { schema });

export { db, pgClient };
