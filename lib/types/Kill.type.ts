import { MeanthOfDeath } from '@/lib/enum/MeanthOfDeath.enum'

export type Kill = {
  timestamp: number
  killerId: number
  victimId: number
  killedBy: {
    entityId: number
    entityName: MeanthOfDeath
  }
  suicide?: boolean
}
