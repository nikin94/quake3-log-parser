import Select from 'react-select'
import { FileInput, ExportToJSON } from '@/components'
import { parseFileContent } from '@/lib/fileContentHandler'
import { Game } from '@/lib/types/Game.type'
import styles from './styles.module.css'

interface IHeader {
  games: Game[]
  setGames: Function
  game: Game | undefined
  setGame: Function
}

export default function Header({ games, setGames, game, setGame }: IHeader) {
  const handleUpload = (file: File) => {
    const fileReader = new FileReader()
    fileReader.readAsText(file)
    fileReader.onloadend = () => {
      onNewGameData(fileReader.result as string)
    }
  }

  const onNewGameData = (text: string) => {
    const games = parseFileContent(text)
    setGames(games)
    setGame(games[0])
  }

  const clearGamesData = () => {
    setGame()
    setGames([])
  }

  return (
    <header className='flex justify-between items-center mb-4'>
      <h1 className='text-2xl'>Quake III log parser</h1>
      {games.length ? (
        <div className='flex'>
          <ExportToJSON games={games} />
          <Select
            options={games}
            onChange={g => setGame(g)}
            value={game}
            placeholder='Select game'
            getOptionLabel={game => `Game #${game.id}`}
            getOptionValue={game => game.id.toString()}
          />
          <button className={`${styles.default} ml-2`} onClick={clearGamesData}>
            try another
          </button>
        </div>
      ) : (
        <p>
          <FileInput handleUpload={handleUpload} />
          or
          <button
            className={`${styles.default} ml-1`}
            onClick={() => {
              fetch('default.log')
                .then(r => r.text())
                .then(onNewGameData)
            }}
          >
            use default
          </button>
        </p>
      )}
    </header>
  )
}
