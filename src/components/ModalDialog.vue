<template>
  <div
    v-if="isOpen"
    @keydown.esc="emit('close')"
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center backdrop-blur-sm justify-center"
    role="dialog"
    aria-modal="true"
    ref="modalElement"
  >
    <div class="bg-white p-5 rounded max-w-md w-full">
      <h2 class="text-xl font-bold mb-4">Add New Card</h2>
      <input
        type="text"
        placeholder="Card Title"
        aria-label="Card Title"
        class="w-full p-2 mb-4 border rounded"
        ref="titleInput"
      />
      <textarea
        class="w-full p-2 mb-4 border rounded"
        placeholder="Description"
        aria-label="Card Description"
      ></textarea>

      <div class="flex justify-end gap-2">
        <button
          @click="emit('close')"
          class="bg-gray-300 hover:bg-gray-200 text-black px-4 py-2 rounded"
        >
          Cancel
        </button>
        <button
          @click="emit('close')"
          class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          Save
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch, nextTick } from 'vue'
import { useFocusTrap } from '@vueuse/integrations'

const props = defineProps<{ isOpen: boolean }>()
const emit = defineEmits<{ (e: 'close'): void }>()

const titleInput = ref<HTMLInputElement | null>(null)

watch(
  () => props.isOpen,
  async (isOpen) => {
    if (isOpen) {
      await nextTick()
      activate()
      titleInput.value?.focus()
    } else {
      deactivate()
    }
  },
)

const modalElement = ref<HTMLDivElement | null>(null)
const { activate, deactivate } = useFocusTrap(modalElement)
</script>
