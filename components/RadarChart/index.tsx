import { useMemo } from 'react'
import { Chart as ChartJS, registerables } from 'chart.js'
import { Radar } from 'react-chartjs-2'
import { Game } from '@/lib/types/Game.type'
import { getItemsByName } from '@/lib/helpers/Item.h'

ChartJS.register(...registerables)

interface IRadarChart {
  game: Game
}

export default function RadarChart({ game }: IRadarChart) {
  const data = useMemo(() => {
    const itemNames = [...new Set(game.items.map(i => i.name))]

    const _data = {
      labels: itemNames,
      datasets: [
        {
          data: itemNames.map(n => getItemsByName(n, game.items).length),
          borderWidth: 1
        }
      ]
    }
    return _data
  }, [game])

  const hideAxisLines = {
    grid: { display: false, drawBorder: false },
    ticks: { display: false },
    border: { display: false }
  }

  const options = {
    plugins: {
      title: {
        display: true,
        text: 'Items collected'
      },
      legend: {
        display: false
      }
    },
    scales: {
      x: hideAxisLines,
      y: hideAxisLines
    }
  }

  return <Radar data={data} options={options} />
}
