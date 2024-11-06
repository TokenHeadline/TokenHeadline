'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import { useQuery } from '@apollo/client'
import { GET_ALL_PRESS_RELEASES } from '../../../services'
import client from '../../lib/apolloClient'
import Link from 'next/link'

const ArticlesPage = () => {
  const ARTICLES_PER_PAGE = 1
  const [cursor, setCursor] = useState(null)
  const { loading, error, data } = useQuery(GET_ALL_PRESS_RELEASES, {
    client,
    variables: {
      first: ARTICLES_PER_PAGE,
      after: cursor,
    },
    onCompleted: (newData) => {
      if (newData?.pressReleases?.edges) {
        setCursor(newData.pressReleases.pageInfo.endCursor)
      }
    },
  })

  function formatDateWithOrdinalAndAbbreviatedMonth(dateStr) {
    const date = new Date(dateStr)

    const day = date.getDate()
    const year = date.getFullYear()

    const months = [
      'JAN',
      'FEB',
      'MAR',
      'APR',
      'MAY',
      'JUN',
      'JUL',
      'AUG',
      'SEPT',
      'OCT',
      'NOV',
      'DEC',
    ]
    const month = months[date.getMonth()]

    return `${day} ${month} ${year}`
  }

  if (loading && !data)
    return <p className='text-center text-lg h-screen'>Loading...</p>
  if (error)
    return (
      <p className='text-center text-lg text-red-500'>
        Error loading press releases
      </p>
    )

  const pressReleases = data?.pressReleases?.edges || []

  return (
    <div className='container items-center mx-auto lg:px-14 md:px-12 px-8'>
      <div className='grid grid-cols-1 gap-8 items-center'>
        <head>
          <title>Press Releases</title>
          <meta
            name='description'
            content='Discover a diverse collection of press releases on various topics from TokenHeadline.'
          />
        </head>

        {pressReleases.map(({ node: news }) => (
          <Link
            href={`/press-release/${news.slug}`}
            aria-label={`${news.slug}`}
            passHref
            className='mx-auto flex flex-col md:flex-row shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 border-2 border-black'
            key={news.id}
          >
            <div className='relative h-60 w-full md:w-1/3'>
              <Image
                src={news.featuredImage.node.sourceUrl}
                alt={news.title}
                fill
                className='object-cover'
              />
            </div>

            <div className='p-6 flex flex-col justify-between w-full md:w-2/3 relative'>
              <div className='bg-gradient-to-tl from-blue-400 to-blue-900 text-white pt-1 font-semibold px-2 absolute h-8 w-40 top-0 font-2xl items-center text-center rounded-br-md rounded-bl-md'>
                PRESS RELEASE
              </div>
              <h2 className='text-2xl font-semibold text-gray-800 line-clamp-2 mt-4'>
                {news.title}
              </h2>
              <p className='text-base text-gray-600 line-clamp-3'>
                {news.excerpt.split(' ').slice(0, 65).join(' ') + '...'}
              </p>
              <div className='flex black'>
                <p className='text-sm font-normal'>
                  By {news.author.node.name.toUpperCase()}
                </p>
                <span className='mx-2'></span>
                <p className='text-sm font-normal'>
                  {formatDateWithOrdinalAndAbbreviatedMonth(news.date)}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {data?.pressReleases?.pageInfo?.hasNextPage && (
        <div className='mt-12 flex justify-center items-center space-x-6 mb-2'>
          <button
            className={`px-5 py-2 border-2 transition-all duration-300 text-lg font-medium ${
              !cursor
                ? 'border-gray-300 text-gray-300 cursor-not-allowed'
                : 'border-red-500 text-red-500 hover:bg-red-500 hover:text-white'
            }`}
            onClick={() => setCursor(data.pressReleases.pageInfo.endCursor)}
            disabled={!cursor}
          >
            Load More
          </button>
        </div>
      )}
    </div>
  )
}

export default ArticlesPage
