import { sqliteTable, integer, text, uniqueIndex } from 'drizzle-orm/sqlite-core'
 export enum MenuItemType {
  INTERNAL = 'internal',
  EXTERNAL = 'external',
  ANCHOR = 'anchor',
}

export const menuItems = sqliteTable('menu_items', {
	id: integer('id').primaryKey({ autoIncrement: true }), 
  label: text('label').notNull(),
  to: text('to').notNull(),
  parentId: integer('parent_id'),
  order: integer('order').notNull(),
  type: text('type').notNull(),
})

export const users = sqliteTable('users', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  password: text('password').notNull(),
  avatar: text('avatar').notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
})