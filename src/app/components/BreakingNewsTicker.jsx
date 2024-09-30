'use client'
import React, { useEffect } from 'react'
import { BREAKING_NEWS } from '../../../services/index'
import { useQuery } from '@apollo/client'
import client from '../../lib/apolloClient'
const BreakingNewsTicker = ({ News }) => {
  const { loading, error, data } = useQuery(BREAKING_NEWS, { client: client })
  const [news, setNews] = React.useState([])
  useEffect(() => {
    if (data && data.articles) {
      setNews(data.articles)
    }
  }, [data])
  return (
    <div className='relative overflow-hidden whitespace-nowrap py-6 text-black px-4'>
      <div className='absolute inset-0 flex items-center animate-marquee'>
        {news
          .filter((newsItem) => newsItem.breakingNews)
          .map((newsItem, index) => (
            <div className='px-10 text-base' key={index}>
              <span className='font-semibold px-3'>BREAKING NEWS</span>
              <span>{newsItem.title}</span>
            </div>
          ))}
      </div>
    </div>
  )
}

export default BreakingNewsTicker
