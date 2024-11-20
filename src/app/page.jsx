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

export default function Home() {
  return (
    <div>
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
