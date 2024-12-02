import React from 'react'
import PressReleasesPage from './PressReleasesPage'
export async function generateMetadata() {
  return {
    metadataBase: new URL('https://tokenheadline.com/interview'),
    title: 'Interviews',
    description:
      'Explore exclusive interviews with leading experts and innovators in Web3 and crypto on Token Headline. Gain unique insights into the rapidly evolving digital finance and technology landscape.',
    images: [
      {
        url: '/logo.png',
        width: 1200,
        height: 630,
        alt: 'Token Headline',
      },
    ],
    url: 'https://tokenheadline.com/interview',
    type: 'interviews',
    siteName: 'Token Headline',
  }
}

const page = () => {
  return <PressReleasesPage />
}

export default page
