import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import ReactQueryProvider from './utils/providers/ReactQueryProvider'
import './styles/globals.css'
import React from 'react'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Pokémon',
  description: 'Pokémon Next.js Web Application',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReactQueryProvider>
          <main>{children}</main>
        </ReactQueryProvider>
      </body>
    </html>
  )
}
