<script setup lang="ts">
import { useChat } from 'ai/vue'
import { ref, watch } from 'vue'

const systemPrompt = ref('')
const { messages, input, handleSubmit, isLoading, stop, error, reload } = useChat({
  initialMessages: [{ role: 'system', content: systemPrompt.value }],
})

const chatContainer = ref<HTMLElement | null>(null)

const scrollToBottom = () => {
  if (chatContainer.value) {
    chatContainer.value.scrollTop = chatContainer.value.scrollHeight
  }
}

const wrappedHandleSubmit = async (event: Event) => {
  await handleSubmit(event)
  scrollToBottom()
}

// Update system message when systemPrompt changes
watch(systemPrompt, (newPrompt) => {
  const systemMessageIndex = messages.value.findIndex(m => m.role === 'system')
  if (systemMessageIndex !== -1) {
    messages.value[systemMessageIndex].content = newPrompt
  } else {
    messages.value.unshift({ role: 'system', content: newPrompt })
  }
})
</script>

<template>
  <div class="chat-container">
    <UCard class="mb-4">
      <UFormGroup label="System Prompt">
        <UTextarea
          v-model="systemPrompt"
          placeholder="Enter system prompt here..."
          :ui="{ wrapper: 'w-full' }"
          autoresize
        />
      </UFormGroup>
    </UCard>
    <div ref="chatContainer" class="messages-container">
      <UCard v-for="m in messages" :key="m.id" class="message-card" :ui="{ body: { padding: 'px-4 py-2' } }">
        <template #header>
          <span class="font-bold" :class="{
            'text-blue-600': m.role === 'user',
            'text-green-600': m.role === 'assistant',
            'text-purple-600': m.role === 'system'
          }">
            {{ m.role === 'user' ? 'You' : m.role === 'assistant' ? 'AI' : 'System' }}
          </span>
        </template>
        <p class="text-sm">{{ m.content }}</p>
      </UCard>
    </div>
    <div v-if="error" class="error-container">
      <UAlert icon="i-heroicons-exclamation-triangle" color="red" variant="soft" :title="error.message || 'An error occurred'" />
      <UButton color="red" variant="soft" icon="i-heroicons-arrow-path" @click="reload">Retry</UButton>
    </div>
    <form @submit="wrappedHandleSubmit" class="input-container">
      <UTextarea
        v-model="input"
        placeholder="Type your message here..."
        :ui="{ wrapper: 'w-full' }"
        autoresize
      />
      <UButton
        v-if="isLoading"
        color="red"
        variant="soft"
        icon="i-heroicons-stop"
        @click="stop"
      >
        Stop
      </UButton>
      <UButton
        v-else
        type="submit"
        color="primary"
        icon="i-heroicons-paper-airplane"
      >
        Send
      </UButton>
    </form>
  </div>
</template>

<style scoped>
.chat-container {
  @apply max-w-2xl mx-auto p-4 flex flex-col h-[80vh];
}

.messages-container {
  @apply flex-1 overflow-y-auto space-y-4 mb-4;
}

.message-card {
  @apply max-w-[80%] shadow-sm;
}

.message-card:nth-child(even) {
  @apply ml-auto;
}

.error-container {
  @apply mb-4 space-y-2;
}

.input-container {
  @apply flex items-end space-x-2;
}
</style>