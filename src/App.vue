<template>
  <main class="p-5 font-sans">
    <div class="flex-col md:flex-row flex gap-5 py-5 overflow-x-auto">
      <div
        v-for="(list, listIndex) in trelloStore.lists"
        :key="list.id"
        class="bg-gray-100 p-3 rounded-lg flex min-w-[250px] flex-col"
      >
        <h2 class="font-medium mb-2">{{ list.title }}</h2>

        <Draggable :list="list.cards" group="cards" item-key="id">
          <template #item="{ element }">
            <div
              @click="openModal(listIndex, element)"
              class="bg-white p-2 my-2 rounded shadow cursor-grab"
            >
              <span class="text-sm font-medium">{{ element.title }}</span>
              <p class="text-xs text-gray-400">{{ element.description }}</p>
            </div>
          </template>
        </Draggable>

        <button
          @click="openModal(listIndex)"
          class="w-full bg-transparent rounded hover:bg-white text-gray-500 p-2 text-left mt-2 text-sm font-medium"
        >
          + Add Card
        </button>
      </div>
    </div>

    <ModalDialog />
  </main>
</template>

<script setup lang="ts">
import Draggable from 'vuedraggable'
import ModalDialog from './components/ModalDialog.vue'
import type { Card } from './types'
import { useTrelloStore } from './stores/trello'

const trelloStore = useTrelloStore()

const openModal = (listIndex: number, card?: Card) => {
  trelloStore.editingListIndex = listIndex
  trelloStore.editingCard = card === undefined ? null : card
  trelloStore.isModalOpen = true
}
</script>
