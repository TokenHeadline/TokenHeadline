import { Inria_Sans } from 'next/font/google'
import './globals.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

const inriaSans = Inria_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '700'],
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
      </body>
    </html>
  )
}
