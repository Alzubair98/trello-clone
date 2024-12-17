<template>
  <main class="p-5 font-sans">
    <div class="flex gap-5 py-5 overflow-x-auto">
      <div
        v-for="(list, listIndex) in lists"
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

    <ModalDialog
      :isOpen="isModalOpen"
      @save="saveCard"
      @close="closeModel"
      :mode="modalMode"
      :card="editingCard"
    />
  </main>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import Draggable from 'vuedraggable'
import ModalDialog from './components/ModalDialog.vue'
import type { Card, List } from './types'

const lists = reactive<List[]>([
  {
    id: 1,
    title: 'To Do',
    cards: [
      { id: 1, title: 'Task 1', description: 'Description for Task 1' },
      { id: 2, title: 'Task 2', description: 'Description for Task 2' },
    ],
  },
  {
    id: 2,
    title: 'In Progress',
    cards: [
      { id: 3, title: 'Task 3', description: 'Description for Task 3' },
      { id: 4, title: 'Task 4', description: 'Description for Task 4' },
    ],
  },
  {
    id: 3,
    title: 'Done',
    cards: [{ id: 5, title: 'Task 5', description: 'Description for Task 5' }],
  },
])

const isModalOpen = ref<boolean>(false)
const editingCard = ref<Card | null>(null)
const editingListIndex = ref<number | null>(null)

const modalMode = computed(() => (editingCard.value === null ? 'add' : 'edit'))

const openModal = (listIndex: number, card?: Card) => {
  editingListIndex.value = listIndex
  editingCard.value = card === undefined ? null : card
  isModalOpen.value = true
}

const saveCard = (card: Card) => {
  if (editingListIndex.value === null) {
    return
  }
  if (modalMode.value === 'add') {
    // adding card
    const newId = Math.max(...lists.flatMap((list) => list.cards.map((c) => c.id)))
    lists[editingListIndex.value].cards.push({ ...card, id: newId })
  } else {
    // modify card
    const cardIndex = lists[editingListIndex.value].cards.findIndex(
      (cardOnList) => cardOnList.id === card.id,
    )
    if (cardIndex != -1) {
      lists[editingListIndex.value].cards[cardIndex] = card
    }
  }
  closeModel()
}

const closeModel = () => {
  isModalOpen.value = false
  editingListIndex.value = null
  editingCard.value = null
}
</script>
