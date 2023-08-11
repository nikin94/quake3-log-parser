import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Quake III parser',
  description: 'Simple app to parse Quake 3 log files and check game stats'
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body
        className={`${inter.className} bg-neutral-200 container mx-auto p-4`}
      >
        {children}
      </body>
    </html>
  )
}
