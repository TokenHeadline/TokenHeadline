import { Inria_Sans } from 'next/font/google'
import './globals.css'
import Navbar from './components/Navbar'
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
      <title>Token Headline</title>
      <meta
        name='description'
        content='Token Headline provides the latest updates on Web3 and crypto news, in-depth articles, and exclusive interviews. Stay informed with our comprehensive coverage and expert insights on the rapidly evolving world of digital finance and technology.'
      />
      <meta name='viewport' content='width=device-width, initial-scale=1' />
      <body
        className={inriaSans.className}
        style={{ backgroundColor: '#e5e7eb' }}
      >
        <Navbar />
        {children}
      </body>
    </html>
  )
}
