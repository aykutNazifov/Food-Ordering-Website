import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Banner from '@/components/Banner'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import AuthProvider from '@/providers/AuthProvider'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
        <AuthProvider>
          <Banner />
          <Header />
          {children}
          <Footer />
          <ToastContainer position='bottom-right' theme='dark' autoClose={3000} />
        </AuthProvider>
      </body>
    </html>
  )
}
