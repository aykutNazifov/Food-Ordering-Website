import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Banner from '@/components/Banner'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Food Ordering',
  description: 'Food Ordering Website',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Banner />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}
