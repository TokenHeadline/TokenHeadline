import React from 'react'
import Today from './components/Today'
import Articles from './components/Articles'
import './globals.css'
import BreakinNewsTicker from './components/BreakingNewsTicker'
import Topics from './components/Topics'
import Latest from './components/Latest'
import ArticlesGrid from './components/ArticlesGrid'
import Courses from './components/Courses'
import Banner from './components/Banner'
import PR from './components/PR'
export async function generateMetadata() {
  return {
    title: 'Home - Token Headline',
    description:
      'Stay updated with the latest news, courses, and articles on various trending topics.',
    keywords: [
      'news',
      'Web3',
      'trending topics',
      'courses',
      'crypto',
      'breaking news',
    ],
    openGraph: {
      title: 'Home - Token Headline',
      description:
        'Stay updated with the latest news, courses, and articles on various trending topics.',
      url: 'https://tokenheadline.com',
      images: [
        {
          url: '/logo.png',
          width: 1200,
          height: 630,
          alt: 'Token Headline',
        },
      ],
      type: 'website',
      site_name: 'Token Headline',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Home - Your Site Name',
      description:
        'Stay updated with the latest news, courses, and articles on various trending topics.',
      images: ['/logo.png'],
    },
  }
}
export default function Home() {
  return (
    <div className='h-max'>
      <section className='flex flex-col m-4 lg:flex-row lg:space-x-4 lg:ml-16 lg:mr-16 '>
        <Today />
        <Articles />
        <Banner />
      </section>
      <BreakinNewsTicker />
      <section className='space-y-8 m-4 lg:flex-row lg:space-x-4 lg:mt-4 lg:ml-16 lg:mr-16'>
        <Topics />
      </section>
      <section className='space-y-8 m-4 lg:flex-row lg:space-x-4 lg:mt-8 lg:ml-16 lg:mr-16'>
        <Latest />
      </section>

      <section className=''>
        <ArticlesGrid />
        <PR />
      </section>
      <section className='space-y-8 m-4 lg:flex-row lg:space-x-4 lg:mt-8 lg:ml-16 lg:mr-16'>
        <Courses />
      </section>
    </div>
  )
}
