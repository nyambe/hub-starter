export default eventHandler(async () => {
  const items = await useDrizzle().select().from(tables.features).all()

  return items
})
