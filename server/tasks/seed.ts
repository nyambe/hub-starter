

export default defineTask({
  meta: {
    name: 'db:seed',
    description: 'Run database seed task'
  },
  async run() {
    console.log('Running DB seed task...')
		const feedData = [
      { 
        title: 'Nuxt 3', 
        description: 'Modern Vue.js framework', 
        icon: 'i-simple-icons-nuxtdotjs',
        to: '/nuxt',
        order: 1
      },
      { 
        title: 'Pinia', 
        description: 'Intuitive state management', 
        icon: 'i-simple-icons-threedotjs',
        to: '/pinia',
        order: 2
      },
      { 
        title: 'Drizzle', 
        description: 'Typescript ORM Database Management', 
        icon: 'i-ph-database',
        to: '/drizzle',
        order: 3
      },
      { 
        title: 'NuxtUI', 
        description: 'Beautiful UI components', 
        icon: 'i-simple-icons-nuxtdotjs',
        to: '/nuxt-ui',
        order: 4
      },
      { 
        title: 'TypeScript', 
        description: 'Enhanced developer experience', 
        icon: 'i-simple-icons-typescript',
        to: '/typescript',
        order: 5
      },
      { 
        title: 'AI Models', 
        description: 'Powerful AI models for chat', 
        icon: 'i-ph-magic-wand',
        to: '/ai-models',
        order: 6
      },
      { 
        title: 'Cache', 
        description: 'Caching for your application', 
        icon: 'i-ph-lightning',
        to: '/cache',
        order: 7
      },
      { 
        title: 'Key Value', 
        description: 'Efficient key-value storage', 
        icon: 'i-ph-coin',
        to: '/key-value',
        order: 8
      },
    ];
    await useDrizzle().insert(tables.features).values(feedData)
    return { result: 'success' }
  }
})
