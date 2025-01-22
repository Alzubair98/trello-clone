export interface Card {
  id: number
  title: string
  description: string
  date: string
}

export interface List {
  id: number
  title: string
  cards: Card[]
}

export interface Item {
  label: string
  icon: string
  active: boolean
}

export interface currentUser {
  id: number
  username: string
  role: string
}
