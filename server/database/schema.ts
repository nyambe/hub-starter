import { sqliteTable, integer, text, uniqueIndex } from 'drizzle-orm/sqlite-core'

export enum MenuItemType {
  INTERNAL = 'internal',
  EXTERNAL = 'external',
  ANCHOR = 'anchor',
}

export const menuItems = sqliteTable('menu_items', {
  id: integer('id').primaryKey(),
  label: text('label').notNull(),
  to: text('to').notNull(),
  parentId: integer('parent_id'),
  order: integer('order').notNull(),
  type: text('type', { enum: ['internal', 'external', 'anchor'] }).notNull(),
}, (table) => {
  return {
    parentIdIdx: uniqueIndex('parent_id_idx').on(table.parentId),
  }
});