<script setup lang="ts">
import { useAppStore } from '~/stores/app'

const state = useAppStore()

onMounted(() => {
  state.fetchMenuItems()
})



</script>

<template>
  <header class="bg-white shadow-md">
    <div class="container mx-auto px-4">
      <div class="flex justify-between items-center py-4">
        <NuxtLink to="/" class="text-xl font-bold text-gray-800">
          {{ state.siteName }}
        </NuxtLink>
        
        <!-- Desktop Menu -->
        <nav class="hidden md:block">
          <ul class="flex space-x-4">
            <li v-for="item in state.menuStructure" :key="item.id">
              <component :is="state.renderMenuItem(item)" class="text-gray-600 hover:text-gray-800" />
            </li>
          </ul>
        </nav>

        <!-- Mobile Menu Toggle -->
        <button @click="state.toggleMenu" class="md:hidden">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
      </div>

      <!-- Mobile Menu -->
      <div v-show="state.isMenuOpen" class="md:hidden">
        <ul class="py-2">
          <pre>
            {{ state.menuStructure }}
          </pre>
          <!-- <component :is="state.renderMenuItems(state.menuStructure)" /> -->
        </ul>
      </div>
    </div>
  </header>
</template>