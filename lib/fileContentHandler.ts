import { MeanthOfDeath } from '@/lib/enum/MeanthOfDeath.enum'
import { LogPattern } from '@/lib/enum/LogPattern.enum'
import { Game, GameSettings } from '@/lib/types/Game.type'
import { Kill } from '@/lib/types/Kill.type'
import { Player, PlayerSettings } from '@/lib/types/Player.type'

const WORLD_ID = 1022

export function parseFileContent(text: string) {
  const games: Game[] = []

  // split by lines
  const dataArr = text.split(/\r?\n/)

  for (let i in dataArr) {
    let line = dataArr[i].trim()
    parseLine(line, games, +i)
  }

  return games
}

const parseLine = (line: string, games: Game[], lineIndex: number) => {
  // skip divider lines
  const regex = new RegExp(/^(\d+:\d+ [-]{60})$/)
  if (line.match(regex)) return

  // log an error if the string does not match the pattern
  if (!line.match(/^\d+:\d+ [a-zA-Z]+:.*$/))
    return console.warn({ lineIndex, line })

  const timestamp = getDurationInSecondsFromLine(line)

  // remove time from line
  line = line.replace(/\d+:\d+ /, '')

  // get line pattern type
  const lineType = LogPattern[<LogPattern>line.split(':')[0]]

  const lineContent = line.substring(
    line.indexOf(lineType) + lineType.length + 1
  )

  const game = games[games.length - 1]

  const getPlayerById = (id: number) =>
    <Player>game.players.find(p => p.id === id)
  const getPlayerByName = (name: string) =>
    <Player>game.players.find(p => p.name === name)

  // -- InitGame --
  if (lineType === LogPattern.InitGame) {
    games.push({
      id: games.length,
      createdAt: timestamp,
      settings: parseGameSettings(lineContent),
      players: [],
      kills: [],
      items: [],
      score: {},
      chat: []
    })
  }

  // -- ShutdownGame --
  if (lineType === LogPattern.ShutdownGame) {
    game.shutdownGame = timestamp
  }

  // -- Exit --
  if (lineType === LogPattern.Exit) {
    game.exit = { timestamp, reason: lineContent.trim() }
  }

  // -- ClientConnect --
  if (lineType === LogPattern.ClientConnect) {
    const id = +lineContent
    const player = getPlayerById(id)
    if (player) {
      player.clientConnect.push(timestamp)
    } else {
      game.players.push({
        id,
        clientConnect: [timestamp],
        clientDisconnect: [],
        clientUserinfoChanged: {},
        clientBegin: []
      })
      game.score[id] = { total: 0 }
    }
  }

  // -- ClientUserinfoChanged --
  if (lineType === LogPattern.ClientUserinfoChanged) {
    const id = lineContent.trim().split(' ')[0]
    const player = game.players.find(p => p.id === +id)
    if (!player) return

    const parsedParams = parseClientInfoSettings(
      lineContent.substring(id.length + 1)
    )
    player.clientUserinfoChanged[timestamp] = parsedParams
    player.name = parsedParams.n
    game.score[+id].name = parsedParams.n
  }

  // -- ClientBegin --
  if (lineType === LogPattern.ClientBegin) {
    const player = getPlayerById(+lineContent)
    player.clientBegin.push(timestamp)
  }

  // -- ClientDisconnect --
  if (lineType === LogPattern.ClientDisconnect) {
    const player = getPlayerById(+lineContent)
    player.clientDisconnect.push(timestamp)
  }

  // -- Item --
  if (lineType === LogPattern.Item) {
    const [playerId, itemName] = lineContent.trim().split(' ')

    game.items.push({ name: itemName, collectedBy: +playerId, timestamp })
  }

  // -- Kill --
  if (lineType === LogPattern.Kill) {
    const content = lineContent.trim().split(': ')
    const ids = content[0].split(' ')
    const killerId = +ids[0]
    const victimId = +ids[1]
    const entityId = +ids[2]
    const data = <Kill>{
      timestamp,
      killerId,
      victimId,
      killedBy: {
        entityId,
        entityName: <unknown>MeanthOfDeath[entityId]
      }
    }

    if (killerId === victimId || killerId === WORLD_ID) {
      game.score[victimId].total--
      data.suicide = true
    } else {
      game.score[killerId].total++
    }

    game.kills.push(data)
  }

  // -- score --
  if (lineType === LogPattern.score) {
    const splitted = lineContent.trim().split(': ')
    const total = +splitted[0].split(' ')[0]
    const ping = +splitted[1].split(' ')[0]
    const id = +splitted[2].split(' ')[0]
    const name = splitted[2].substring(id.toString().length + 1)

    game.score[id] = { total, name, ping }
  }

  // -- say --
  if (lineType === LogPattern.say) {
    const [name, message] = lineContent.trim().split(': ')
    const player = getPlayerByName(name)

    game.chat.push({ timestamp, id: player.id, name, message })
  }

  // -- red --
  if (lineType === LogPattern.red) {
    const splitted = lineContent.split('  ')
    const redScore = +splitted[0]
    const blueScore = +splitted[1].split(':')[1]

    game.score.red = redScore
    game.score.blue = blueScore
  }
}

// turn time from string to timestamp
const getDurationInSecondsFromLine = (line: string) => {
  const colonId = line.indexOf(':')
  const minutes = +line.substring(0, colonId)
  const seconds = +line.substring(colonId + 1, colonId + 3)
  return minutes * 60 + seconds
}

// turn given game settings string to object
const parseGameSettings = (line: string) => {
  const gameSettings: { [key: string]: string | number } = {}
  const arr = line.trim().split('\\')
  for (let i = 1; i < arr.length; i += 2) {
    const value = isNaN(+arr[i + 1]) ? arr[i + 1] : +arr[i + 1]
    gameSettings[arr[i]] = value
  }
  return <GameSettings>gameSettings
}

// turn given client settings string to object
const parseClientInfoSettings = (line: string) => {
  const playerSettings: { [key: string]: string | number } = {}
  const arr = line.trim().split('\\')
  for (let i = 0; i < arr.length; i += 2) {
    const value = isNaN(+arr[i + 1]) ? arr[i + 1] : +arr[i + 1]
    playerSettings[arr[i]] = value
  }
  return <PlayerSettings>playerSettings
}
