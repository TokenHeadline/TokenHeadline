// BreakingNewsTickerServer.js
import React from 'react'
import { BREAKING_NEWS } from '../../../services/index'
import client from '../../lib/apolloClient'

const BreakingNewsTickerServer = async () => {
  // Fetch data on the server side
  const { data } = await client.query({
    query: BREAKING_NEWS,
  })

  const news = data.articles

  return (
    <div className='relative overflow-hidden whitespace-nowrap py-6 text-black px-4'>
      <div className='absolute inset-0 flex items-center animate-marquee'>
        {news.map((newsItem, index) => (
          <div className='px-10 text-base' key={index}>
            <span className='font-semibold px-3'>BREAKING NEWS</span>
            <span>{newsItem.title}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default BreakingNewsTickerServer
