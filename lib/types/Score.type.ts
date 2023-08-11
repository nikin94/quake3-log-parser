type PlayerScore = {
  total: number
  name?: string
  ping?: number
}

export type Score = {
  [id: number]: PlayerScore
  red?: number
  blue?: number
}
