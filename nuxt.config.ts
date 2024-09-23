// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-07-30',
  runtimeConfig: {
    pineconeApiKey: process.env.NUXT_PINECONE_API_KEY,
    openaiApiKey: process.env.NUXT_OPENAI_API_KEY,
    anthropicApiKey: process.env.NUXT_ANTHROPIC_API_KEY,
    qdrantApiKey: process.env.NUXT_QDRANT_API_KEY,
    envTest: process.env.NUXT_ENV_TEST,
    envTest2: process.env.NUXT_ENV_TEST2,
  },
  // Nuxt 4 directory structure and features
  // https://nuxt.com/docs/getting-started/upgrade#testing-nuxt-4
  future: { compatibilityVersion: 4 },
  // Nuxt Modules
  // https://nuxt.com/modules
  colorMode: {
    preference: 'light'
  },
  modules: [
    '@nuxthub/core',
    '@nuxt/eslint',
    '@pinia/nuxt',
    '@vueuse/nuxt',
    '@nuxt/ui',
    '@nuxt/fonts',
    '@nuxtjs/i18n',
    '@nuxt/image',
  ],
  hub: {
    database: true,
    kv: true,
    blob: true,
    cache: true,
    ai: true,
    // remote: true,
  },
  nitro: {
    experimental: {
      // Enable Server API documentation within NuxtHub
      openAPI: true,
      tasks: true
    },
  },
  // Development
  devtools: { enabled: true },
})