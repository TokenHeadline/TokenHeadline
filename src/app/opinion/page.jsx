import React from 'react'
import OpinionPage from './OpinionPage'
export async function generateMetadata() {
  return {
    metadataBase: new URL('https://tokenheadline.com/opinion'),
    title: 'Opinion',
    description:
      'Explore expert opinions and analysis on the latest trends and developments in Web3 and crypto on Token Headline. Gain unique insights into the rapidly evolving digital finance and technology landscape.',
    images: [
      {
        url: '/logo.png',
        width: 1200,
        height: 630,
        alt: 'Token Headline',
      },
    ],
    url: 'https://tokenheadline.com/opinion',
    type: 'opinion',
    siteName: 'Token Headline',
  }
}
const page = () => {
  return <OpinionPage />
}

export default page
