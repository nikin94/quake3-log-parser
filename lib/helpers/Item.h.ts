import { Item } from '@/lib//types/Item.type'

export const getItemsByName = (name: string, items: Item[]) =>
  items.filter(i => i.name === name)
