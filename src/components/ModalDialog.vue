<template>
  <div
    v-if="trelloStore.isModalOpen"
    @keydown.esc="trelloStore.closeModel"
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center backdrop-blur-sm justify-center"
    role="dialog"
    aria-modal="true"
    ref="modalElement"
    @click.self="trelloStore.closeModel"
  >
    <div class="bg-white p-5 rounded max-w-md w-full">
      <h2 class="text-xl font-bold mb-4">
        {{ trelloStore.modalMode === 'add' ? 'Add New Card' : 'Edit Card' }}
      </h2>
      <input
        v-model="localCard.title"
        type="text"
        placeholder="Card Title"
        aria-label="Card Title"
        class="w-full p-2 mb-4 border rounded"
        ref="titleInput"
      />
      <textarea
        v-model="localCard.description"
        class="w-full p-2 mb-4 border rounded"
        placeholder="Description"
        aria-label="Card Description"
      ></textarea>

      <div class="flex justify-end gap-2">
        <button
          @click="trelloStore.closeModel"
          class="bg-gray-300 hover:bg-gray-200 text-black px-4 py-2 rounded"
        >
          Cancel
        </button>

        <button
          @click="save(localCard)"
          class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          {{ trelloStore.modalMode === 'add' ? 'Add' : 'Save' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch, nextTick } from 'vue'
import { useFocusTrap } from '@vueuse/integrations'
import type { Card } from '../types'
import { useTrelloStore } from '../stores/trello'

const trelloStore = useTrelloStore()

const titleInput = ref<HTMLInputElement | null>(null)
const modalElement = ref<HTMLDivElement | null>(null)
const localCard = ref<Card>({ id: 0, title: '', description: '' })
const { activate, deactivate } = useFocusTrap(modalElement)

const save = (card: Card) => {
  trelloStore.saveCard(card)
}

watch(
  () => trelloStore.editingCard,
  (newCard) => {
    if (newCard) {
      localCard.value = { ...newCard }
    } else {
      localCard.value = { id: 0, title: '', description: '' }
    }
  },
  { immediate: true },
)

watch(
  () => trelloStore.isModalOpen,
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
</script>
