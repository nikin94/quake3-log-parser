import { Game } from '@/lib/types/Game.type'

export default function ExportToJSON({ games }: { games: Game[] }) {
  const href = `data:text/json;charset=utf-8,${encodeURIComponent(
    JSON.stringify(games)
  )}`

  return (
    <a
      className='flex items-center bg-blue-500 hover:bg-blue-400 text-white mr-4 py-1 px-2 rounded'
      href={href}
      download='quake3log.json'
    >
      Export to JSON
    </a>
  )
}
