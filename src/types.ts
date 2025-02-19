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
