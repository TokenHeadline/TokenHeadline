import React from 'react'
import Today from './components/Today'
import Articles from './components/Articles'
import Banner from './components/Banner'
import './globals.css'
import News from '../../public/News.json'

export default function Home() {
  return (
    <div>
      <section className='flex flex-col space-y-8 m-4 lg:flex-row lg:m-14 lg:space-x-4 lg:space-y-0 lg:mt-0 lg:ml-16 ml-8'>
        <Today News={News} />
        <Articles News={News} />
        <Banner />
      </section>
    </div>
  )
}
