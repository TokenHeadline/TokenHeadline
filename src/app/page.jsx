import React from 'react'
import Today from './components/Today'
import Articles from './components/Articles'
import Banner from './components/Banner'
import './globals.css'
import News from '../../public/News.json'
import BreakinNewsTicker from './components/BreakingNewsTicker'
import Topics from './components/Topics'
export default function Home() {
  return (
    <div className='md:ml-10 sm:ml-8'>
      <section className='flex flex-col  m-4 mb-0 lg:flex-row  lg:space-x-4 lg:space-y-0 lg:mt-4 ml-8 mr-8 '>
        <Today News={News} />
        <Articles News={News} />
        <Banner News={News} />
      </section>
      <BreakinNewsTicker News={News} />
      <section className='space-y-8 m-4 lg:flex-row lg:mb-14 lg:space-x-4 lg:space-y-0 lg:mt-4 ml-8 mr-8 '>
        <Topics />
      </section>
    </div>
  )
}
