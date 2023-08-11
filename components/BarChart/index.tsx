import { useMemo } from 'react'
import { Game } from '@/lib/types/Game.type'
import { Chart as ChartJS, registerables } from 'chart.js'
import { Bar } from 'react-chartjs-2'

ChartJS.register(...registerables)

interface IBarChart {
  game: Game
}

export default function BarChart({ game }: IBarChart) {
  const data = useMemo(() => {
    const _data = {
      labels: ['Players', 'Kills', 'Suicides'],
      datasets: [
        {
          data: [
            game.players.length,
            game.kills.filter(kill => !kill.suicide).length,
            game.kills.filter(kill => kill.suicide).length
          ],
          backgroundColor: [
            'rgba(101, 200, 37, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 99, 132, 0.2)'
          ],
          borderColor: [
            'rgb(101, 200, 37)',
            'rgb(255, 159, 64)',
            'rgb(255, 99, 132)'
          ],
          borderWidth: 2
        }
      ]
    }
    return _data
  }, [game])

  const options = {
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: 'General info'
      },
      legend: {
        display: false
      }
    }
  }

  return <Bar data={data} options={options} />
}
