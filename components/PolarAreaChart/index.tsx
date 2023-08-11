import { useMemo } from 'react'
import { Game } from '@/lib/types/Game.type'
import { getKillsByPlayer } from '@/lib/helpers/Kills.h'
import { getPlayerNames } from '@/lib/helpers/Players.h'
import { Chart as ChartJS, registerables } from 'chart.js'
import { PolarArea } from 'react-chartjs-2'

ChartJS.register(...registerables)

interface IPolarAreaChart {
  game: Game
}

export default function PolarAreaChart({ game }: IPolarAreaChart) {
  const data = useMemo(() => {
    const playersKillCount = game.players.map(
      p => getKillsByPlayer(p.id, game.kills).length
    )

    const _data = {
      labels: getPlayerNames(game.players),
      datasets: [
        {
          label: 'Kills',
          data: playersKillCount,
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(75, 192, 192)',
            'rgb(255, 205, 86)',
            'rgb(201, 203, 207)',
            'rgb(54, 162, 235)'
          ]
        }
      ]
    }

    return _data
  }, [game])

  const options = {
    plugins: {
      title: {
        display: true,
        text: 'Kills'
      }
    },
    scale: {
      ticks: {
        precision: 0
      }
    }
  }

  return <PolarArea data={data} options={options} />
}
