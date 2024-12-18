import { defineStore } from 'pinia'
import type { Card, List } from '../types'
import { reactive, ref, computed } from 'vue'

export const useTrelloStore = defineStore('trello', () => {
  // variables
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

  // functions

  const closeModel = () => {
    isModalOpen.value = false
    editingListIndex.value = null
    editingCard.value = null
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
  // computed functions

  const modalMode = computed(() => (editingCard.value === null ? 'add' : 'edit'))

  // return
  return {
    lists,
    isModalOpen,
    editingCard,
    modalMode,
    editingListIndex,
    closeModel,
    saveCard,
  }
})
