'use client'

import { useState } from 'react'
import { JsonViewer } from '@textea/json-viewer'
import { BarChart, Header, PolarAreaChart, RadarChart } from '@/components'
import { Game } from '@/lib/types/Game.type'
import styles from './styles.module.css'

export default function Home() {
  const [games, setGames] = useState([])
  const [game, setGame] = useState<Game>()

  return (
    <>
      <Header games={games} setGames={setGames} game={game} setGame={setGame} />
      {game ? (
        <div className={styles.charts}>
          <div className='flex justify-between'>
            <div className={styles.json}>
              <JsonViewer
                rootName={`Game #${game.id}`}
                defaultInspectDepth={1}
                value={game}
                highlightUpdates
                style={{
                  overflow: 'auto',
                  width: '100%'
                }}
              />
            </div>
            <div className={`${styles.chart} ml-4`}>
              <BarChart game={game} />
            </div>
          </div>
          {game.items.length ? (
            <div className='flex justify-between items-center mt-4'>
              <div className={styles.inlineChart}>
                <RadarChart game={game} />
              </div>
              <div className={styles.inlineChart}>
                <PolarAreaChart game={game} />
              </div>
            </div>
          ) : null}
        </div>
      ) : null}
    </>
  )
}
