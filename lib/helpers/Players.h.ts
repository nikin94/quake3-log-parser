import { Player } from '@/lib/types/Player.type'

export const getPlayerNames = (players: Player[]) => players.map(p => p.name)
