// api/menu/index.post.ts
export default defineEventHandler(async (event) => {
  const itemData = await readBody(event)

  const item = await useDrizzle().insert(tables.menuItems).values(itemData).returning().get()
  
  return item
  
})
