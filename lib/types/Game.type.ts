import { Player } from './Player.type'
import { Kill } from './Kill.type'
import { Item } from './Item.type'
import { Score } from './Score.type'
import { ChatMessage } from './ChatMessage.type'

export type Game = {
  id: number
  createdAt: number
  settings: GameSettings
  players: Player[]
  kills: Kill[]
  items: Item[]
  score: Score
  chat: ChatMessage[]
  shutdownGame?: number
  exit?: {
    timestamp: number
    reason: string
  }
}

export type GameSettings = {
  sv_floodProtect: number
  sv_maxPing: number
  sv_minPing: number
  sv_maxRate: number
  sv_minRate: number
  sv_hostname: string
  g_gametype: number
  sv_privateClients: number
  sv_maxclients: number
  sv_allowDownload: number
  dmflags: number
  fraglimit: number
  timelimit: number
  g_maxGameClients: number
  capturelimit: number
  version: string
  protocol: number
  mapname: string
  gamename: string
  g_needpass: number
}
