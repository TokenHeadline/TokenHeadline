import { Inria_Sans } from 'next/font/google'
import './globals.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
// Configure the Inria Sans font with the specific weights
const inriaSans = Inria_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '700'], // Specify the weights you want to use
})
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body
        className={inriaSans.className + ' h-screen'}
        style={{ backgroundColor: '#e9e9e9' }}
      >
        <Navbar />
        {children}
        <Footer />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
