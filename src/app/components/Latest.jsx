'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { GET_LATEST } from '../../../services/index'
import client from '../../lib/apolloClient'
import Link from 'next/link'

const Latest = () => {
  const [news, setNews] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [hovered, setHovered] = useState(false)

  useEffect(() => {
    const fetchLatestNews = async () => {
      try {
        const { data } = await client.query({
          query: GET_LATEST,
        })
        setNews(data?.opinions?.nodes || []) // Fallback to empty array if data is missing
      } catch (err) {
        console.error('Error fetching latest news:', err)
        setError(err)
      } finally {
        setLoading(false)
      }
    }

    fetchLatestNews()
  }, [])

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error loading news: {error.message}</p>

  return (
    <div className='p-4'>
      <h1 className='text-3xl sm:text-4xl lg:text-5xl font-bold'>Opinion</h1>

      {news.slice(0, 1).map((newsItem, index) => {
        const title = newsItem?.title || 'Untitled Article' // Fallback title
        const slug = newsItem?.slug || '#' // Fallback slug
        const excerpt = newsItem?.excerpt
          ? newsItem.excerpt
              .replace(/<\/?[^>]+(>|$)/g, '')
              .split(' ')
              .slice(0, 70)
              .join(' ') + '...'
          : 'No excerpt available' // Fallback excerpt
        const author = newsItem?.author?.node?.name || 'Unknown Author' // Fallback author name
        const imageUrl =
          newsItem?.featuredImage?.node?.sourceUrl || '/image.png' // Fallback image

        return (
          <div
            className='flex flex-col lg:flex-row gap-6 items-center mb-6'
            key={index}
          >
            <div className='flex-1'>
              <div className='mr-0 lg:mr-20'>
                <Link
                  href={`/opinion/${slug}`}
                  className='font-bold text-2xl md:text-3xl lg:text-4xl mb-4 duration-300 ease-in-out transform hover:scale-105'
                >
                  {title}
                </Link>

                {/* Excerpt */}
                <p className='text-base md:text-lg'>{excerpt}</p>
              </div>
              <div className='flex items-center space-x-4 p-4'>
                <p className='text-lg font-bold'>
                  <span className='mr-2'>By</span>
                  {author}
                </p>
              </div>
            </div>

            <div className='flex-1'>
              <div className='w-full'>
                {/* Featured Image */}
                <img
                  src={imageUrl || '/fallback-image.jpg'}
                  width='630'
                  height='452'
                  alt={title || 'Default Title'}
                  className='object-contain lg:w-[630px] lg:h-[452px]'
                  style={{
                    filter: hovered ? 'none' : 'grayscale(100%)',
                    transition: 'filter 0.3s ease',
                  }}
                  onMouseEnter={() => setHovered(true)}
                  onMouseLeave={() => setHovered(false)}
                />
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Latest
