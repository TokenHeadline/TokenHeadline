'use client'
import React, { useEffect, useState } from 'react'
import Today from './components/Today'
import Articles from './components/Articles'
import Banner from './components/Banner'
import './globals.css'
import News from '../../public/News.json'
import Course from '../../public/Course.json'
import BreakinNewsTicker from './components/BreakingNewsTicker'
import Topics from './components/Topics'
import Latest from './components/Latest'
import ArticlesGrid from './components/ArticlesGrid'
import Courses from './components/Courses'
import { GET_NEWS } from '../../services/index'
import { useQuery } from '@apollo/client'
import client from '../lib/apolloClient'
import { motion } from 'framer-motion'
import TodaySkeleton from './components/Skeleton/TodaySkeleton'
import ArticlesSkeleton from './components/Skeleton/ArticlesSkeleton'
import BannerSkeleton from './components/Skeleton/BannerSkeleton'
export default function Home() {
  const { loading, error, data } = useQuery(GET_NEWS, { client })
  // if (loading)
  //   return (
  //     <section className='flex flex-col m-4 lg:flex-row lg:space-x-4 lg:mt-4 lg:ml-16 lg:mr-16 h-screen'>
  //       <TodaySkeleton />
  //       <ArticlesSkeleton />
  //       <BannerSkeleton />
  //     </section>
  //   )
  if (error) return <p>Error: {error.message}</p>
  return (
    <div>
      <section className='flex flex-col m-4 lg:flex-row lg:space-x-4 lg:mt-4 lg:ml-16 lg:mr-16 '>
        <Today News={News} />
        <Articles News={News} />
        <Banner News={News} />
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
