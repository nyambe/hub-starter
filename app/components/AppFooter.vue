<script setup lang="ts">
import { useAppStore } from '~/stores/app'

const appStore = useAppStore()
const { siteName } = storeToRefs(appStore)

const currentYear = new Date().getFullYear()
</script>

<template>
  <footer class="p-4 bg-gray-100 mt-auto">
    <div class="container mx-auto text-center">
      <p>&copy; {{ currentYear }} {{ siteName }}. All rights reserved.</p>
    </div>
  </footer>
</template>