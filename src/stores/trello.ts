import { defineStore } from 'pinia'
import type { Card, List } from '../types'
import { ref, computed } from 'vue'

export const useTrelloStore = defineStore('trello', () => {
  // default data
  const defaultLists: List[] = [
    {
      id: 1,
      title: 'To Do',
      cards: [],
    },
    {
      id: 2,
      title: 'In Progress',
      cards: [],
    },
    {
      id: 3,
      title: 'Done',
      cards: [],
    },
  ]
  // variables
  const lists = ref<List[]>(defaultLists)

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
      const newId = Math.max(...lists.value.flatMap((list) => list.cards.map((c) => c.id))) + 1
      const newCard = {
        ...card,
        id: newId,
        date: 'Created at ' + new Date().toISOString().split('T')[0], // save date without time
      }
      lists.value[editingListIndex.value].cards.push(newCard)
    } else {
      // modify card
      const cardIndex = lists.value[editingListIndex.value].cards.findIndex(
        (cardOnList) => cardOnList.id === card.id,
      )
      if (cardIndex != -1) {
        lists.value[editingListIndex.value].cards[cardIndex] = {
          ...card,
          date: `Updated at ${new Date().toISOString().split('T')[0]}`,
        }
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
