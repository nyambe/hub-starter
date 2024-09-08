import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', () => {
  const siteName = ref('NuxtHub Starter')
  const navigationItems = ref([
    { name: 'Home', path: '/' },
    { name: 'Images', path: '/images' },
    { name: 'Bloc', path: '/blog' },
		{ name: 'Messages', path: '/messages' },
  ])

  return {
    siteName,
    navigationItems,
  }
})