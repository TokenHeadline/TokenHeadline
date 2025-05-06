import { Inria_Sans } from 'next/font/google'
import './globals.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { GoogleAnalytics, GoogleTagManager } from '@next/third-parties/google'

const inriaSans = Inria_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '700'],
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      {/* Automatically adds <script> in head and <noscript> in body */}
      <GoogleTagManager gtmId='GTM-T4DZGCV8' />

      <body
        className={`${inriaSans.className} min-h-screen flex flex-col`}
        style={{ backgroundColor: '#e9e9e9' }}
      >
        <Navbar />
        <main className='flex-grow'>{children}</main>
        <Footer />
        <GoogleAnalytics gaId='G-K9TVGS9B90' />
      </body>
    </html>
  )
}
