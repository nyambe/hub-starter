<script lang="ts" setup>
import { useAppStore } from '~/stores/app'

const state = useAppStore()

// onMounted(() => {
//   state.fetchMenuItems()
// })


</script>

<template>
  <div v-if="state.menuStructure">
   <h1 class="text-3xl font-bold mb-4">Contact</h1>
   <RenderTest :items="state.menuStructure" />
   <!-- <pre> {{ state.menuItems }} </pre> -->
  </div>
</template>

<style>

</style>