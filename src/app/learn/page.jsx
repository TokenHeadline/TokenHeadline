import React from 'react'
import CoursesPage from './Coursepage'
export async function generateMetadata() {
  return {
    metadataBase: new URL('https://tokenheadline.com/learn'),
    title: 'Courses',
    description:
      'Explore the latest Web3 and crypto courses designed and construced by Token Headline. Gain unique insights into the rapidly evolving digital finance and technology landscape.',
    images: [
      {
        url: '/logo.png',
        width: 1200,
        height: 630,
        alt: 'Token Headline',
      },
    ],
    url: 'https://tokenheadline.com/learn',
    type: 'Courses',
    siteName: 'Token Headline',
  }
}
const page = () => {
  return <CoursesPage />
}

export default page
