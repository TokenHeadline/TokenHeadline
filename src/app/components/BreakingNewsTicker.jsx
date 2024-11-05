'use client'
import React, { useEffect, useState } from 'react'
import { BREAKING_NEWS } from '../../../services/index'
import client from '../../lib/apolloClient'

const BreakingNewsTicker = () => {
  const [news, setNews] = useState([])
  const [loading, setLoading] = useState(true)

  // Fetch breaking news on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await client.query({
          query: BREAKING_NEWS,
        })

        // Since data.posts.nodes contains the list of news items, we set it to the state
        setNews(data.posts.nodes || [])
      } catch (error) {
        console.error('Error fetching breaking news:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return <div className='py-6 text-black px-4'>Loading...</div> // Optional loading state
  }

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

export default BreakingNewsTicker
