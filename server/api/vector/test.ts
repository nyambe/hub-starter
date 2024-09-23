export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const api1= config.envTest
  const api2= config.envTest2
  return { api1, api2 }
})