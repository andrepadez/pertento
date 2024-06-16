import { pgTable, pgEnum, text, json } from 'drizzle-orm/pg-core';
import { bigint, smallint, bigserial } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { Variants } from './variants';
import { Users } from '../users';

export const Changes = pgTable('changes', {
  id: bigserial('id', { mode: 'number' }).primaryKey(),
  variantId: bigint('variant_id', { mode: 'number' }),
  userId: bigint('user_id', { mode: 'number' }),
  action: text('action'),
  property: text('property'),
  value: text('value'),
  tagName: text('tag_name'),
  prevValue: text('prev_value'),
  selector: text('selector'),
  tagNames: json('tag_names'),
  prevValues: json('prev_values'),
  friendlySelector: text('friendly_selector'),
  friendlySelectorIndex: smallint('friendly_selector_index', { mode: 'number' }),
  selectors: json('selectors'),
  friendlySelectors: json('friendly_selectors'),
  friendlySelectorIndexes: json('friendly_selectors_indexes'),

  createdAt: bigint('created_at', { mode: 'number' }),
  updatedAt: bigint('updated_at', { mode: 'number' }),

  // elementId: text('element_id'),
  // className: text('className'),
  // siblingElement: text('sibling_element'),
  // siblingElementSelector: text('sibling_element_selector'),
  // siblingElementClassName: text('sibling_element_className'),
  // siblingElementTagName: text('sibling_element_tagName'),
  // originalSiblingElement: text('original_sibling_element'),
  // originalSiblingElementSelector: text('original_sibling_element_selector'),
  // originalSiblingElementClassName: text('original_sibling_element_className'),
  // originalSiblingElementTagName: text('original_sibling_element_tagName'),
  // newSelector: text('new_selector'),
  // originalParent: text('original_parent'),
  // originalParentSelector: text('original_parent_selector'),
  // newSiblingElement: text('new_sibling_element'),
  // top: text('top'),
  // left: text('left'),
});

export const ChangesRelations = relations(Changes, ({ one }) => ({
  variant: one(Variants, {
    fields: [Changes.variantId],
    references: [Variants.id],
  }),
  user: one(Users, {
    fields: [Changes.userId],
    references: [Users.id],
  }),
}));
