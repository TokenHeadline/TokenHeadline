'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import client from '../../lib/apolloClient'
import { GET_PRESS_RELEASES } from '../../../services'

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
  const [articles, setArticles] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const { data } = await client.query({ query: GET_PRESS_RELEASES })
        setArticles(data?.pressReleases?.nodes || [])
      } catch (err) {
        console.error('Error fetching press releases:', err)
        setError(err)
      }
    }

    fetchArticles()
  }, [])

  if (error) return <p>Error loading articles: {error.message}</p>
  if (articles.length === 0) return <p>No articles found</p>

  return (
    <div className='m-4 pt-5 md:pl-16 md:pr-16 xl:pl-16'>
      <h1 className='text-3xl sm:text-4xl lg:text-5xl font-bold mt-12'>
        PRESS RELEASES
      </h1>

      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 py-4 mt-10'>
        {articles.map((news, index) => {
          const title = news?.title || 'Untitled Article'
          const slug = news?.slug || '#'
          const author = news?.author?.node?.name || 'Unknown Author'
          const excerpt = news?.excerpt
            ? news.excerpt
                .replace(/<[^>]+>/g, '')
                .split(' ')
                .slice(0, 30)
                .join(' ') + '...'
            : 'No excerpt available'
          const imageUrl = news?.featuredImage?.node?.sourceUrl || '/image.png'
          const date = formatDateWithOrdinalAndAbbreviatedMonth(news?.date)

          return (
            <Link
              href={`/press-release/${slug}`}
              aria-label={`/press-release/${slug}`}
              className='flex flex-col justify-between overflow-hidden shadow-md backdrop-blur-md bg-white/40 h-full transition duration-300'
              key={index}
            >
              <div className='relative w-full h-48'>
                <Image
                  src={imageUrl}
                  alt={title}
                  fill
                  sizes='(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 33vw'
                  className='object-cover grayscale hover:grayscale-0 transition-all duration-300 ease-in-out'
                />
              </div>

              <div className='p-4 flex-grow'>
                <h2 className='text-lg sm:text-xl font-semibold mb-2'>
                  {title}
                </h2>
                <p className='text-sm text-gray-700 mb-4'>{excerpt}</p>
              </div>

              <div className='p-4 mt-auto'>
                <div className='flex justify-between text-sm text-black'>
                  <p>By {author}</p>
                  <p>{date}</p>
                </div>
              </div>
            </Link>
          )
        })}
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
