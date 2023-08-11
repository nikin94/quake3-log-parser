import { Kill } from '@/lib/types/Kill.type'

export const getKillsByPlayer = (
  playerId: number,
  kills: Kill[],
  includeSuicides: boolean = false
) =>
  kills.filter(k =>
    includeSuicides
      ? k.killerId === playerId
      : k.killerId === playerId && !k.suicide
  )
