import { defineStore } from 'pinia'
import type { Card, List } from '../types'
import { reactive } from 'vue'

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

  // functions
  // computed functions

  // return
  return {
    lists,
  }
})
