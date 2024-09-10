<script setup lang="ts">
import { ref, computed } from 'vue'
import { useAppStore, type MenuItem } from '~/stores/app'

const appStore = useAppStore()
const newItem = ref<Omit<MenuItem, 'id'>>({
  label: '',
  to: '',
  parentId: null,
  order: 0,
  type: 'internal'
})
const editingItem = ref<MenuItem | null>(null)

const menuItems = computed(() => appStore.menuItems)

onMounted(() => {
  appStore.fetchMenuItems()
})

const addItem = async () => {
  try {
    await appStore.addMenuItem(newItem.value)
    newItem.value = { label: '', to: '', parentId: null, order: 0, type: 'internal' }
  } catch (error) {
    console.error('Failed to add item:', error)
  }
}

const startEdit = (item: MenuItem) => {
  editingItem.value = { ...item }
}

const saveEdit = async () => {
  if (editingItem.value) {
    try {
      await appStore.updateMenuItem(editingItem.value.id, editingItem.value)
      editingItem.value = null
    } catch (error) {
      console.error('Failed to update item:', error)
    }
  }
}

const cancelEdit = () => {
  editingItem.value = null
}

const deleteItem = async (id: number) => {
  if (confirm('Are you sure you want to delete this item?')) {
    try {
      await appStore.deleteMenuItem(id)
    } catch (error) {
      console.error('Failed to delete item:', error)
    }
  }
}
</script>

<template>
  <div class="container mx-auto p-4">
    <h2 class="text-2xl font-bold mb-4">Menu Manager</h2>
    
    <!-- Add new item form -->
    <form @submit.prevent="addItem" class="mb-8 p-4 bg-gray-100 rounded">
      <h3 class="text-xl font-semibold mb-2">Add New Menu Item</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input v-model="newItem.label" placeholder="Label" class="p-2 border rounded" required>
        <input v-model="newItem.to" placeholder="URL" class="p-2 border rounded" required>
        <input v-model.number="newItem.order" type="number" placeholder="Order" class="p-2 border rounded" required>
        <select v-model="newItem.type" class="p-2 border rounded" required>
          <option value="internal">Internal</option>
          <option value="external">External</option>
          <option value="anchor">Anchor</option>
        </select>
        <select v-model="newItem.parentId" class="p-2 border rounded">
          <option :value="null">No Parent</option>
          <option v-for="item in menuItems" :key="item.id" :value="item.id">{{ item.label }}</option>
        </select>
      </div>
      <button type="submit" class="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Add Item</button>
    </form>

    <!-- List of menu items -->
    <ul class="space-y-4">
      <li v-for="item in menuItems" :key="item.id" class="p-4 bg-gray-100 rounded">
        <div v-if="editingItem && editingItem.id === item.id">
          <input v-model="editingItem.label" class="p-2 border rounded mb-2 w-full">
          <input v-model="editingItem.to" class="p-2 border rounded mb-2 w-full">
          <div class="flex space-x-2">
            <input v-model.number="editingItem.order" type="number" class="p-2 border rounded flex-grow">
            <select v-model="editingItem.type" class="p-2 border rounded flex-grow">
              <option value="internal">Internal</option>
              <option value="external">External</option>
              <option value="anchor">Anchor</option>
            </select>
            <select v-model="editingItem.parentId" class="p-2 border rounded flex-grow">
              <option :value="null">No Parent</option>
              <option v-for="parentItem in menuItems" :key="parentItem.id" :value="parentItem.id" :disabled="parentItem.id === item.id">
                {{ parentItem.label }}
              </option>
            </select>
          </div>
          <div class="mt-2 space-x-2">
            <button @click="saveEdit" class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">Save</button>
            <button @click="cancelEdit" class="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600">Cancel</button>
          </div>
        </div>
        <div v-else>
          <h3 class="text-lg font-semibold">{{ item.label }}</h3>
          <p>URL: {{ item.to }}</p>
          <p>Order: {{ item.order }}</p>
          <p>Type: {{ item.type }}</p>
          <p>Parent ID: {{ item.parentId || 'None' }}</p>
          <div class="mt-2 space-x-2">
            <button @click="startEdit(item)" class="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600">Edit</button>
            <button @click="deleteItem(item.id)" class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">Delete</button>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>