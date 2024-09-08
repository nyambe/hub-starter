<script setup lang="ts">
import { useAppStore } from '~/stores/app'

const appStore = useAppStore()
const { siteName, navigationItems } = storeToRefs(appStore)

const dropdownItems = computed(() => [
  navigationItems.value.map(item => ({
    label: item.name,
    to: item.path,
  }))
])
</script>

<template>
  <header class="p-4 bg-gray-100">
    <div class="container mx-auto flex justify-between items-center">
      <NuxtLink to="/" class="text-xl font-bold">{{ siteName }}</NuxtLink>
      <nav class="hidden md:block">
        <ul class="flex space-x-4">
          <li v-for="item in navigationItems" :key="item.path">
            <NuxtLink :to="item.path" class="hover:text-gray-600">{{ item.name }}</NuxtLink>
          </li>
        </ul>
      </nav>
      <UDropdown :items="dropdownItems" :popper="{ placement: 'bottom-end' }" class="md:hidden">
        <UButton color="gray" variant="ghost" icon="i-heroicons-bars-3" />
      </UDropdown>
    </div>
  </header>
</template>