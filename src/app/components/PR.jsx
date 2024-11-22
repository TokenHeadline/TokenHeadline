'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { GET_PRESS_RELEASES } from '../../../services/index'
import client from '../../lib/apolloClient'

const formatDateWithOrdinalAndAbbreviatedMonth = (dateStr) => {
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

const ArticlesGrid = () => {
  const [hovered, setHovered] = useState(false)
  const [articles, setArticles] = useState([])

  useEffect(() => {
    const fetchArticles = async () => {
      const { data } = await client.query({
        query: GET_PRESS_RELEASES,
      })
      setArticles(data?.pressReleases?.nodes || []) // Adjusting to the new data structure
    }

    fetchArticles()
  }, [])

  return (
    <div className='m-4 pt-5 md:pl-16 md:pr-16 xl:pl-16'>
      <h1 className='text-3xl sm:text-4xl lg:text-5xl font-bold mt-12'>
        PRESS RELEASES
      </h1>

      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 py-4 mt-10'>
        {articles.map((news, index) => (
          <Link
            href={`/press-release/${news.slug || ''}`}
            aria-label={`/press-release/${news.slug || ''}`}
            className='flex flex-col justify-between overflow-hidden shadow-md backdrop-blur-md bg-white/40 h-full'
            key={index}
          >
            <div className='relative w-full h-48'>
              <div
                className='relative w-full h-full'
                style={{ maxWidth: '640px' }}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
              >
                <img
                  src={
                    news.featuredImage?.node?.sourceUrl || '/fallback-image.jpg'
                  }
                  alt={news.title || 'No title'}
                  className='w-full h-full object-cover'
                  style={{
                    filter: hovered ? 'none' : 'grayscale(100%)',
                    transition: 'filter 0.3s ease',
                  }}
                />
              </div>
            </div>

            <div className='p-4 flex-grow'>
              <h2 className='text-lg sm:text-xl font-semibold mb-2'>
                {news.title || 'No title'}
              </h2>
              <p className='text-sm text-gray-700 mb-4'>
                {news.excerpt
                  ? news.excerpt
                      .replace(/<[^>]+>/g, '')
                      .split(' ')
                      .slice(0, 30)
                      .join(' ') + '...'
                  : 'No excerpt available'}{' '}
              </p>
            </div>

            <div className='p-4 mt-auto'>
              <div className='flex justify-between text-sm text-black'>
                <p>By {news.author?.node?.name || 'Unknown author'}</p>{' '}
                <p>
                  {news.date
                    ? formatDateWithOrdinalAndAbbreviatedMonth(news.date)
                    : 'No date available'}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className='text-center mt-8'>
        <Link
          href='/press-release'
          className='inline-block px-6 py-2 text-white bg-black rounded-md shadow-md hover:bg-blue-700 transition-colors mb-4'
        >
          More Releases
        </Link>
      </div>
    </div>
  )
}

export default ArticlesGrid
