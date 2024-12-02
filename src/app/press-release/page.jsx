import React from 'react'
import PressReleasesPage from './PressReleasesPage'
export async function generateMetadata() {
  return {
    metadataBase: new URL('https://tokenheadline.com/press-release'),
    title: 'Press Releases',
    description:
      'Explore the latest Web3 and crypto press releases on Token Headline. Stay informed with comprehensive coverage of digital finance and technology.',
    images: [
      {
        url: '/logo.png',
        width: 1200,
        height: 630,
        alt: 'Token Headline',
      },
    ],
    url: 'https://tokenheadline.com/press-release',
    type: 'press-releases',
    siteName: 'Token Headline',
  }
}
const page = () => {
  return <PressReleasesPage />
}

export default page
