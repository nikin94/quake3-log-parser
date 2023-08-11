export type Player = {
  id: number
  clientConnect: number[]
  clientDisconnect: number[]
  clientUserinfoChanged: {
    [id: number]: PlayerSettings
  }
  clientBegin: number[]
  name?: string
  itemsCollected?: {
    [itemName: string]: number[]
  }
}

export type PlayerSettings = {
  c1: number
  c2: number
  g_blueteam: number
  g_redteam: number
  hc: number
  hmodel: string
  l: number
  model: string
  n: string
  t: number
  tl: number
  tt: number
  w: number
}
