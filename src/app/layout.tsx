import { Inria_Sans } from 'next/font/google'
import './globals.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { metadata } from 'framer-motion/client'

const inriaSans = Inria_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '700'],
})

export async function generateMetadata() {
  return {
    metadataBase: new URL('https://tokenheadline.com'),
    title: 'Token Headline',
    description:
      'Token Headline provides the latest updates on Web3 and crypto news, in-depth articles, and exclusive interviews. Stay informed with our comprehensive coverage and expert insights on the rapidly evolving world of digital finance and technology.',
    images: [
      {
        url: '/logo.png',
        width: 1200,
        height: 630,
        alt: 'Token Headline',
      },
    ],
    url: 'https://tokenheadline.com',
    type: 'website',
    siteName: 'Token Headline',
    // Open Graph Meta Tags
    openGraph: {
      title: 'Token Headline',
      description:
        'Token Headline provides the latest updates on Web3 and crypto news, in-depth articles, and exclusive interviews.',
      url: 'https://tokenheadline.com',
      images: [
        {
          url: '/logo.png',
          width: 1200,
          height: 630,
          alt: 'Token Headline',
        },
      ],
      siteName: 'Token Headline',
      type: 'website',
    },
    // Twitter Card Meta Tags
    twitter: {
      card: 'summary_large_image', // For large image preview
      title: 'Token Headline',
      description:
        'Token Headline provides the latest updates on Web3 and crypto news, in-depth articles, and exclusive interviews.',
      image: '/logo.png', // Path to the image
      creator: '@tokenheadline', // Optional: Twitter handle
    },
  }
}

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
