import React from 'react'
import ArticlesPage from './Articlespage'
export async function generateMetadata() {
  return {
    metadataBase: new URL('https://tokenheadline.com/articles'),
    title: 'Articles',
    description:
      'Discover the latest Web3 and crypto news, in-depth articles and expert insights on Token Headline. Stay informed with comprehensive coverage of digital finance and technology.',
    images: [
      {
        url: '/logo.png',
        width: 1200,
        height: 630,
        alt: 'Token Headline',
      },
    ],
    url: 'https://tokenheadline.com/articles',
    type: 'articles',
    siteName: 'Token Headline',
  }
}
const page = () => {
  return <ArticlesPage />
}

export default page
