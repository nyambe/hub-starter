<script setup lang="ts">
// No setup needed for the layout
</script>

<template>
  <div class="min-h-screen flex flex-col template-default">
    <AppHeader />
    <main class="flex-grow container mx-auto">
      <slot />
    </main>
    <AppFooter />
  </div>
</template>

<style>
.template-default {
  font-family:  'Montserrat', sans-serif;
}
</style>