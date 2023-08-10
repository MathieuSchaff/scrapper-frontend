import './globals.css'
import { Inter } from 'next/font/google'

import Providers from '@/components/Auth/Providers'
import Navbar from '@/components/Navbar'
const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Scrapper frontend',
  description: 'You scrap all the jobs you want',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  )
}
