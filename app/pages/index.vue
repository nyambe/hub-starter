<script setup lang="ts">
import { useAppStore } from '~/stores/app'

const appStore = useAppStore()
const { siteName } = storeToRefs(appStore)

const features = [
  { title: 'Nuxt 3', description: 'Modern Vue.js framework', icon: 'i-simple-icons-nuxtdotjs' },
  { title: 'TypeScript', description: 'Enhanced developer experience', icon: 'i-simple-icons-typescript' },
  { title: 'Pinia', description: 'Intuitive state management', icon: 'i-simple-icons-threedotjs' },
  { title: 'NuxtUI', description: 'Beautiful UI components', icon: 'i-simple-icons-nuxtdotjs' },
]
const heroImage = '/hero-image.webp' // Replace with your actual image path
</script>

<template>
  <div>
    <!-- Hero Section -->
    <section class="relative h-[70vh] flex items-center justify-center text-center text-white">
      <NuxtImg :src="heroImage" class="absolute inset-0 w-full h-full object-cover" alt="Hero image" />
      <div class="absolute inset-0 bg-black opacity-50"></div>
      <div class="relative z-10">
        <h1 class="text-4xl md:text-6xl font-bold mb-4">Welcome to {{ siteName }}</h1>
        <p class="text-xl md:text-2xl mb-8">Your modern web development solution</p>
        <UButton
          size="xl"
          color="white"
          variant="solid"
          to="/about"
          label="Learn More"
        />
      </div>
    </section>

    <!-- Features Section -->
    <section class="py-16 bg-gray-100">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold text-center mb-12">Key Features</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div v-for="feature in features" :key="feature.title" class="bg-white p-6 rounded-lg shadow-md">
            <UIcon :name="feature.icon" class="text-4xl mb-4 text-primary" />
            <h3 class="text-xl font-semibold mb-2">{{ feature.title }}</h3>
            <p class="text-gray-600">{{ feature.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-16 bg-primary text-white text-center">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold mb-4">Ready to get started?</h2>
        <p class="text-xl mb-8">Join us and start building amazing web applications today!</p>
        <UButton
          size="lg"
          color="white"
          variant="outline"
          to="/contact"
          label="Contact Us"
        />
      </div>
    </section>
  </div>
</template>