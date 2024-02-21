import Footer from '@/components/Footer'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Header from '@/components/Header'
import { Providers } from './providers'
import { Toaster } from "react-hot-toast";
import { auth } from '@/auth'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Next App',
  description: 'Created by Ifaz',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()
  console.log(session)
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Header session={session} />
          <Toaster />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
