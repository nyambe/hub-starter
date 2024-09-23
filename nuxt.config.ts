// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-07-30',
  runtimeConfig: {
    pineconeApiKey: '',
    openaiApiKey: '',
    anthropicApiKey: '',
    qdrantApiKey: '',
    envTest: '0123',
    envTest2: '0000',
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