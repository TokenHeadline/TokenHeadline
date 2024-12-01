'use client'
import React, { useEffect, useState } from 'react'
import TodaySkeleton from './Skeleton/TodaySkeleton'
import { GET_TODAY } from '../../../services/index'
import client from '../../lib/apolloClient'
import Link from 'next/link'

const formatDateWithOrdinalAndAbbreviatedMonth = (dateStr) => {
  if (!dateStr) return 'Unknown Date'
  const date = new Date(dateStr)
  const day = date.getDate()
  const year = date.getFullYear()
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sept',
    'Oct',
    'Nov',
    'Dec',
  ]
  const month = months[date.getMonth()]
  const getOrdinal = (day) => {
    if (day > 3 && day < 21) return 'th'
    switch (day % 10) {
      case 1:
        return 'st'
      case 2:
        return 'nd'
      case 3:
        return 'rd'
      default:
        return 'th'
    }
  }
  return `${day}${getOrdinal(day)} ${month} ${year}`
}

const Today = () => {
  const [news, setNews] = useState(null)
  const [loading, setLoading] = useState(true)
  const [hovered, setHovered] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await client.query({
          query: GET_TODAY,
        })
        setNews(data.posts.nodes)
      } catch (error) {
        console.error("Error fetching today's articles:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  if (loading) return <p>Loading</p>
  if (!news || news.length === 0) return <p>No articles available.</p>

  const cleanExcerpt = (excerpt) => {
    return excerpt
      ? excerpt.replace(/\n/g, '').replace(/<\/?p>/g, '')
      : 'No description available.'
  }

  const fallbackImageUrl = '/fallback.jpg'

  return (
    <div className='flex flex-col lg:pl-6 lg:pt-0 p-4 md:basis-6/12 xl:basis-4/12'>
      {news.slice(0, 1).map((article, index) => (
        <div key={index} className='space-y-4'>
          <h1 className='text-3xl sm:text-4xl lg:text-5xl font-bold mb-1'>
            RECENT RELEASE
          </h1>
          <Link
            href={`/article/${article.slug || '#'}`}
            aria-label={`/article/${article.slug || '#'}`}
            className='text-xl sm:text-2xl md:text-3xl font-bold'
          >
            {article.title || 'Untitled Article'}
          </Link>
          <div className='flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-8 text-sm sm:text-base'>
            <p className='font-bold'>
              {(
                article.categories.nodes[0]?.name || 'Uncategorized'
              ).toUpperCase()}
            </p>
            <p className='text-black'>
              By {article.author?.node?.name || 'Unknown Author'}
            </p>
            <p className='text-black'>
              {formatDateWithOrdinalAndAbbreviatedMonth(article.date)}
            </p>
          </div>
          <p className='text-base sm:text-lg md:text-xl'>
            {cleanExcerpt(article.excerpt).split(' ').slice(0, 20).join(' ') +
              '...'}
          </p>
          <div className='flex justify-center'>
            <div className='relative inline-block mt-3'>
              <div className='absolute inset-0 pointer-events-none'>
                <div className='absolute -top-2 -left-2 w-8 h-8 border-t-2 border-l-2 border-black'>
                  <div className='absolute -top-1 -left-1 w-2 h-2 bg-black rounded-br-full'></div>
                </div>
                <div className='absolute -top-1.5 -right-1.5 w-8 h-8 border-t-2 border-r-2 border-black'>
                  <div className='absolute -top-0 -right-0 w-2 h-2 bg-black rounded-bl-full'></div>
                </div>
                <div className='absolute -bottom-1.5 -left-1.5 w-8 h-8 border-b-2 border-l-2 border-black'>
                  <div className='absolute -bottom-0 -left-0 w-2 h-2 bg-black rounded-tr-full'></div>
                </div>
                <div className='absolute -bottom-2 -right-2 w-8 h-8 border-b-2 border-r-2 border-black'>
                  <div className='absolute -bottom-1 -right-1 w-2 h-2 bg-black rounded-tl-full'></div>
                </div>
              </div>
              <div className=''>
                <img
                  src={
                    article.featuredImage?.node?.sourceUrl || fallbackImageUrl
                  }
                  alt={article.title || 'Featured image'}
                  width={400}
                  height={300}
                  style={{
                    width: '100%',
                    height: 'auto',
                    filter: hovered ? 'none' : 'grayscale(100%)',
                    transition: 'filter 0.3s ease',
                  }}
                  onMouseEnter={() => setHovered(true)}
                  onMouseLeave={() => setHovered(false)}
                />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Today
