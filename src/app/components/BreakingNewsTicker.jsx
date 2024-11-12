'use client'
import React, { useEffect, useState } from 'react'
import { BREAKING_NEWS } from '../../../services/index'
import client from '../../lib/apolloClient'

const BreakingNewsTicker = () => {
  const [news, setNews] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await client.query({
          query: BREAKING_NEWS,
        })
        setNews(data?.posts?.nodes || [])
      } catch (error) {
        console.error('Error fetching breaking news:', error)
        setNews([]) // Fallback to an empty array in case of error
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  if (loading) {
    return <div className='py-6 text-black px-4'>Loading...</div>
  }

  return (
    <div className='relative overflow-hidden whitespace-nowrap py-6 text-black px-4'>
      <div className='absolute inset-0 flex items-center animate-marquee'>
        {news.length > 0 ? (
          news.map((newsItem, index) => (
            <div className='px-10 text-base' key={newsItem.id || index}>
              <span className='font-semibold px-3'>BREAKING NEWS</span>
              <span>{newsItem.title || 'Untitled News'}</span>
            </div>
          ))
        ) : (
          <div className='px-10 text-base'>No breaking news available</div>
        )}
      </div>
    </div>
  )
}

export default BreakingNewsTicker
