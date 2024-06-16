import { pgTable, pgEnum, serial, varchar, text, boolean } from 'drizzle-orm/pg-core';
import { smallint, bigint, bigserial, uuid, numeric, decimal } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { Users } from './users';

export const Passkeys = pgTable('passkeys', {
  id: bigserial('id', { mode: 'number' }).primaryKey(),
  email: varchar('email', { length: 256 }).notNull(),
  origin: varchar('origin', { length: 256 }),
  credentialId: text('credential_id'),
  publicKey: text('public_key'),
});

export const PasskeysRelations = relations(Passkeys, ({ one }) => ({
  user: one(Users, {
    fields: [Passkeys.email],
    references: [Users.email],
  }),
}));
