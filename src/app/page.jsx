import React from 'react'
import Today from './components/Today'
import Articles from './components/Articles'
import Banner from './components/Banner'
import './globals.css'
import Course from '../../public/Course.json'
import BreakinNewsTicker from './components/BreakingNewsTicker'
import Topics from './components/Topics'
import Latest from './components/Latest'
import ArticlesGrid from './components/ArticlesGrid'
import Courses from './components/Courses'
import News from '../../public/News.json'
export default function Home() {
  return (
    <div>
      <BreakinNewsTicker News={News} />
      <section className='flex flex-col m-4 lg:flex-row lg:space-x-4 lg:mt-4 lg:ml-16 lg:mr-16 '>
        <Today />
        <Articles />
        <Banner />
      </section>
      <BreakinNewsTicker News={News} />
      <section className='space-y-8 m-4 lg:flex-row lg:space-x-4 lg:mt-4 lg:ml-16 lg:mr-16'>
        <Topics />
      </section>
      <section className='space-y-8 m-4 lg:flex-row lg:space-x-4 lg:mt-8 lg:ml-16 lg:mr-16'>
        <Latest News={News} />
      </section>
      <section className=''>
        <ArticlesGrid News={News} />
      </section>
      <section className='space-y-8 m-4 lg:flex-row lg:space-x-4 lg:mt-8 lg:ml-16 lg:mr-16'>
        <Courses Course={Course} />
      </section>
    </div>
  )
}
