// api/menu/[id].delete.ts
export default eventHandler(async (event) => {
  const { id } = getRouterParams(event)

  const deletedTodo = await useDrizzle().delete(tables.menuItems).where(eq(tables.menuItems.id, Number(id))).returning().get()

  if (!deletedTodo) {
    throw createError({
      statusCode: 404,
      message: 'Todo not found'
    })
  }

  return deletedTodo
})
