'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import { useQuery } from '@apollo/client'
import { GET_ALL_PRESS_RELEASES } from '../../../services'
import client from '../../lib/apolloClient'
import Link from 'next/link'

const PressReleasesPage = () => {
  const PRESS_RELEASES_PER_PAGE = 5
  const [cursor, setCursor] = useState(null)
  const [pressReleases, setPressReleases] = useState([])

  const { loading, error, data } = useQuery(GET_ALL_PRESS_RELEASES, {
    client,
    variables: {
      first: PRESS_RELEASES_PER_PAGE,
      after: cursor,
    },
    onCompleted: (newData) => {
      if (newData?.pressReleases?.edges) {
        setPressReleases((prevPressReleases) => [
          ...prevPressReleases,
          ...newData.pressReleases.edges.map((edge) => edge.node),
        ])
      }
    },
  })

  // Format the date to a more readable format with abbreviated month
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
    const month = months[date.getMonth()] || 'UNKNOWN'
    return `${day} ${month} ${year}`
  }

  // Handle "Load More" button click
  const handleLoadMore = () => {
    if (data?.pressReleases?.pageInfo?.endCursor) {
      setCursor(data.pressReleases.pageInfo.endCursor) // Set the new cursor
    }
  }

  if (loading && pressReleases.length === 0)
    return <p className='text-center text-lg h-screen'>Loading...</p>

  if (error)
    return (
      <p className='text-center text-lg text-red-500'>
        Error loading press releases
      </p>
    )

  return (
    <div className='container items-center mx-auto lg:px-14 md:px-12 px-8 lg:h-screen'>
      <div className='grid grid-cols-1 gap-8 items-center'>
        <head>
          <title>Press Releases</title>
          <meta
            name='description'
            content='Discover a diverse collection of press releases on various topics from TokenHeadline.'
          />
        </head>

        {pressReleases.map((pressRelease) => {
          // Provide fallbacks for fields
          const title = pressRelease?.title || 'Untitled Press Release'
          const imageUrl =
            pressRelease?.featuredImage?.node?.sourceUrl || '/default-image.jpg'
          const excerpt =
            (pressRelease?.excerpt || '')
              .replace(/<[^>]+>/g, '')
              .split(' ')
              .slice(0, 65)
              .join(' ') + '...'
          const authorName =
            pressRelease?.author?.node?.name?.toUpperCase() || 'Anonymous'
          const date = pressRelease?.date
            ? formatDateWithOrdinalAndAbbreviatedMonth(pressRelease.date)
            : 'Unknown Date'

          return (
            <Link
              key={pressRelease.id} // Using unique ID as key
              href={`/press-release/${pressRelease.slug}`}
              aria-label={title}
              passHref
              className='mx-auto flex flex-col md:flex-row shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 border-2 border-black'
            >
              <div className='relative h-60 w-full md:w-1/3'>
                <Image
                  src={imageUrl}
                  alt={title}
                  fill
                  className='object-cover'
                />
              </div>

              <div className='p-6 flex flex-col justify-between w-full md:w-2/3 relative'>
                <div className='bg-gradient-to-tl from-blue-400 to-blue-900 text-white pt-1 font-semibold px-2 absolute h-8 w-40 top-0 font-2xl items-center text-center rounded-br-md rounded-bl-md'>
                  PRESS RELEASE
                </div>
                <h2 className='text-2xl font-semibold text-gray-800 line-clamp-2 mt-4'>
                  {title}
                </h2>
                <p className='text-base text-gray-600 line-clamp-3'>
                  {excerpt}
                </p>
                <div className='flex'>
                  <p className='text-sm font-normal'>By {authorName}</p>
                  <span className='mx-2'></span>
                  <p className='text-sm font-normal'>{date}</p>
                </div>
              </div>
            </Link>
          )
        })}

        {data?.pressReleases?.pageInfo?.hasNextPage && (
          <div className='text-center mt-8'>
            <button
              onClick={handleLoadMore}
              className='px-6 py-2 bg-softRed text-white rounded-md hover:bg-softGreen transition'
            >
              {loading ? 'Loading...' : 'Load More'}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default PressReleasesPage
