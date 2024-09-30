'use client'
import React from 'react'
import Image from 'next/image'
import { GET_LATEST } from '../../../services/index'
import { useQuery } from '@apollo/client'
import client from '../../lib/apolloClient'
import Link from 'next/link'
const Latest = () => {
  const { loading, error, data } = useQuery(GET_LATEST, { client: client })
  const News = data?.articles || []

  if (loading) {
    return <p>Loading...</p> // Loading state
  }

  if (error) {
    return <p>Error loading news</p> // Error state
  }

  return (
    <div className='p-4'>
      <h1 className='text-3xl sm:text-4xl lg:text-5xl font-bold '>
        LATEST NEWS
      </h1>

      {News.slice(0, 1).map((newsItem, index) => (
        <div
          className='flex flex-col lg:flex-row gap-6 items-center mb-6'
          key={index}
        >
          <div className='flex-1'>
            <div className='flex items-center space-x-4 p-4'>
              {newsItem?.author?.image?.url && (
                <Image
                  src={newsItem.author.image.url}
                  width={33}
                  height={38}
                  alt={newsItem.author.name}
                  className='rounded-full'
                  style={{ width: 'auto', height: 'auto' }}
                />
              )}
              <p className='text-lg font-bold'>
                {newsItem?.author?.name || 'Unknown Author'}
              </p>
            </div>
            <div className='mr-0 lg:mr-20'>
              <Link
                href={`article/${newsItem.slug}`}
                className='font-bold text-2xl md:text-3xl lg:text-4xl mb-4 duration-300 ease-in-out transform hover:scale-105 '
              >
                {newsItem.title}
              </Link>

              <p className='text-base md:text-lg'>
                {newsItem.excerpt
                  ? newsItem.excerpt.split(' ').slice(0, 70).join(' ') + '...'
                  : 'No excerpt available'}
              </p>
            </div>
          </div>

          <div className='flex-1'>
            <div className='w-full'>
              <Image
                src={newsItem?.featuredImage?.url || '/image.png'} // Use newsItem image if available
                width={630}
                height={452}
                alt={newsItem.title}
                className='object-contain lg:w-[630px] lg:h-[452px]'
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Latest
