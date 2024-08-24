import { pgTable, pgEnum, serial, varchar, text, boolean } from 'drizzle-orm/pg-core';
import { smallint, bigint, bigserial, uuid } from 'drizzle-orm/pg-core';
import { integer, numeric, decimal } from 'drizzle-orm/pg-core';
import { Websites, Users, Subscriptions, Invoices } from './';
import { relations } from 'drizzle-orm';
import { COMPANY_SIZES, COMPANY_TYPES } from 'misc';

export const companyTypeEnum = pgEnum('company_type', COMPANY_TYPES);
export const companySizeEnum = pgEnum('company_size', COMPANY_SIZES);

export const Companies = pgTable('companies', {
  id: bigserial('id', { mode: 'number' }).primaryKey(),
  name: text('name').notNull(),
  friendlyName: text('friendly_name'),
  type: companyTypeEnum('type').default(COMPANY_TYPES[0]),
  size: companySizeEnum('size').default(COMPANY_SIZES[0]),
  parentCompanyId: bigint('parent_company_id', { mode: 'number' }),
  ganAccountId: bigint('gan_account_id', { mode: 'number' }),
  createdBy: bigint('created_by', { mode: 'number' }),
  createdAt: bigint('created_at', { mode: 'number' }),
  updatedAt: bigint('updated_at', { mode: 'number' }),
});

export const CompaniesRelations = relations(Companies, ({ many, one }) => ({
  // clients: many(Companies, { relationName: 'clients' }),
  parentCompany: one(Companies, {
    fields: [Companies.parentCompanyId],
    references: [Companies.id],
    relationName: 'parentCompany',
  }),
  websites: many(Websites),
  users: many(Users),
  subscription: one(Subscriptions),
}));
