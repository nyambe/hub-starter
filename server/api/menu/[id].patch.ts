// api/menu/[id].patch.ts
export default eventHandler(async (event) => {
  const { id } = getRouterParams(event)
  const itemData = await readBody(event)

  const item = await useDrizzle().update(tables.menuItems).set(itemData).where(eq(tables.menuItems.id, Number(id))).returning().get()

  return item

})
