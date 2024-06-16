import { pgTable, pgEnum, serial, varchar, text, boolean } from 'drizzle-orm/pg-core';
import { smallint, bigint, bigserial, uuid, numeric, decimal } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { Companies } from './companies';
import { Passkeys } from './passkeys';
import { USER_STATUSES, USER_ROLES } from 'misc';

export const userStatusEnum = pgEnum('user_status', USER_STATUSES);
export const userRolesEnum = pgEnum('user_roles', USER_ROLES);

export const Users = pgTable('users', {
  id: bigserial('id', { mode: 'number' }).primaryKey(),
  email: varchar('email', { length: 256 }).unique().notNull(),
  role: userRolesEnum('role').default(USER_ROLES[0]),
  status: userStatusEnum('status').default(USER_STATUSES[0]),
  statusBy: bigint('status_by', { mode: 'number' }),
  password: varchar('password', { length: 256 }),
  firstName: varchar('first_name', { length: 128 }),
  lastName: varchar('last_name', { length: 128 }),
  avatar: varchar('avatar', { length: 512000 }),
  companyId: bigint('company_id', { mode: 'number' }),
  parentCompanyId: bigint('parent_company_id', { mode: 'number' }),
  invitedBy: bigint('invited_by', { mode: 'number' }),
  createdAt: bigint('created_at', { mode: 'number' }),
  updatedAt: bigint('updated_at', { mode: 'number' }),
});

export const UsersRelations = relations(Users, ({ many, one }) => ({
  passkeys: many(Passkeys, {
    fields: [Users.email],
    references: ['email'],
  }),
  company: one(Companies, {
    fields: [Users.companyId],
    references: [Companies.id],
  }),
  inviter: one(
    Users,
    {
      fields: [Users.invitedBy],
      references: [Users.id],
    },
    'invitedBy',
  ),
}));
