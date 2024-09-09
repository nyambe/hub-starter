import { defineStore } from 'pinia'
import { h } from 'vue'
import { NuxtLink } from '#components'
import { is } from 'drizzle-orm';

export interface MenuItem {
  id: number;
  label: string;
  to: string;
  parentId: number | null;
  order: number;
  type: 'internal' | 'external' | 'anchor';
  children?: MenuItem[];
}

const isMenuOpen = ref(false)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

export const useAppStore = defineStore('app', () => {
  const siteName = ref('My Nuxt 3 Project')
  const menuItems = ref<MenuItem[]>([])

  const fetchMenuItems = async () => {
    try {
      const data = await $fetch<MenuItem[]>('/api/menu')
      menuItems.value = data
    } catch (error) {
      console.error('Error fetching menu items:', error)
    }
  }

  // Function to get a hierarchical menu structure
  const menuStructure = computed(() => {
    const itemMap = new Map(menuItems.value.map(item => [item.id, { ...item }]))
    const rootItems: MenuItem[] = []

    for (const item of itemMap.values()) {
      if (item.parentId === null) {
        rootItems.push(item)
      } else {
        const parent = itemMap.get(item.parentId)
        if (parent) {
          parent.children = parent.children || []
          parent.children.push(item)
        }
      }
    }

    // Sort root items and children by order
    const sortByOrder = (a: MenuItem, b: MenuItem) => a.order - b.order
    rootItems.sort(sortByOrder)
    for (const item of itemMap.values()) {
      item.children?.sort(sortByOrder)
    }

    return rootItems
  })

  const renderMenuItem = (item: MenuItem) => {
    const baseClasses = 'block py-2 px-4 text-sm hover:bg-gray-100'
    if (item.type === 'internal') {
      return h(NuxtLink, { 
        to: item.to, 
        class: baseClasses
      }, () => item.label)
    } else if (item.type === 'external') {
      return h('a', { 
        href: item.to, 
        target: '_blank', 
        rel: 'noopener noreferrer',
        class: baseClasses
      }, item.label)
    } else {
      return h('a', { 
        href: item.to,
        class: baseClasses
      }, item.label)
    }
  }

  const renderMenuItems = (items: MenuItem[]) : VNode[] => {
    return items.map(item => {
      console.log('render', item)
      const children = item.children && item.children.length > 0
        ? h('ul', { class: 'pl-4' }, renderMenuItems(item.children))
        : null
  
      return h('li', { key: item.id }, [
        renderMenuItem(item),
        children
      ]) 
    })
  }

  return {
    siteName,
    menuItems,
    fetchMenuItems,
    menuStructure,
    renderMenuItem,
    isMenuOpen,
    toggleMenu,
    renderMenuItems
  }
})