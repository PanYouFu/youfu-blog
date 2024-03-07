import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

import BodyLayout from '@/components/layout'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'youfu blog',
  description: 'record sth.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode,
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <BodyLayout>{children}</BodyLayout>
      </body>
    </html>
  )
}
