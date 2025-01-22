<template>
  <main class="p-5 font-sans">
    <div
      class="flex-col md:flex-row flex gap-5 py-5 overflow-x-auto"
      v-if="trelloStore.lists.length > 0"
    >
      <div
        v-for="(list, listIndex) in trelloStore.lists"
        :key="list.id"
        class="bg-gray-100 p-3 rounded-lg flex min-w-[250px] flex-col"
      >
        <h2 class="font-medium mb-2">{{ list.title }}</h2>

        <Draggable :list="list.cards" group="cards" item-key="id">
          <template #item="{ element }">
            <div class="flex flex-col bg-white my-2 p-2 rounded shadow justify-between">
              <div
                class="cursor-grab flex justify-between"
                @click.self="openModal(listIndex, element)"
              >
                <div @click="openModal(listIndex, element)">
                  <span class="text-sm font-medium">{{ element.title }}</span>
                  <p class="text-xs text-gray-400">{{ element.description }}</p>
                </div>
                <div>
                  <!-- <button
                  @click.self="console.log('delete')"
                  class="border rounded bg-red-400 text-white hover:bg-red-500 w-5"
                >
                  X
                </button> -->
                </div>
              </div>
              <div class="text-sm mt-2 text-gray-400" @click.self="openModal(listIndex, element)">
                {{ element.date ? element.date : 'No date available' }}
              </div>
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
    <div v-else><h1>no local storage</h1></div>

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
