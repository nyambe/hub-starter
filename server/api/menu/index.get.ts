export default eventHandler(async () => {
  const items = await useDrizzle().select().from(tables.menuItems).all()

  return items
})
