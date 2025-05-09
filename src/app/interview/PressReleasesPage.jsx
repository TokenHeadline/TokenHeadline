'use client'
import React, { useState } from 'react'
import { useQuery } from '@apollo/client'
import { GET_ALL_INTERVIEWS } from '../../../services'
import client from '../../lib/apolloClient'
import Link from 'next/link'

const PressReleasesPage = () => {
  const PRESS_RELEASES_PER_PAGE = 5
  const [cursor, setCursor] = useState(null)
  const [pressReleases, setPressReleases] = useState([])

  const { loading, error, data } = useQuery(GET_ALL_INTERVIEWS, {
    client,
    variables: {
      first: PRESS_RELEASES_PER_PAGE,
      after: cursor,
    },
    onCompleted: (newData) => {
      if (newData?.interviews?.edges) {
        setPressReleases((prevPressReleases) => [
          ...prevPressReleases,
          ...newData.interviews.edges.map((edge) => edge.node),
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
    const month = months[date.getMonth()]
    return `${day} ${month} ${year}`
  }

  // Handle "Load More" button click
  const handleLoadMore = () => {
    if (data?.interviews?.pageInfo?.endCursor) {
      setCursor(data.interviews.pageInfo.endCursor) // Set the new cursor
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
    <div className='container items-center mx-auto lg:px-14 md:px-12 px-8 '>
      <div className='grid grid-cols-1 gap-8 items-center'>
        {pressReleases.map((pressRelease, index) => {
          // Adding fallbacks for fields
          const {
            title = 'Untitled Interview', // Fallback for title
            featuredImage = {}, // Fallback for featuredImage
            excerpt = 'No excerpt available.', // Fallback for excerpt
            author = {}, // Fallback for author
            date = '', // Fallback for date
            slug = '', // Fallback for slug
            id = index, // Use index if id is not available
          } = pressRelease

          // Destructuring with fallbacks for author data
          const authorName = author?.node?.name || 'Unknown Author'
          const authorImage =
            author?.node?.image?.sourceUrl || '/placeholder.jpg'

          // Destructuring with fallbacks for featured image
          const imageUrl = featuredImage?.node?.sourceUrl || '/placeholder.jpg'

          // Format the date with fallback
          const formattedDate = date
            ? formatDateWithOrdinalAndAbbreviatedMonth(date)
            : 'Unknown Date'

          // Remove HTML tags and fallback to 'No excerpt available.'
          const sanitizedExcerpt =
            excerpt?.replace(/<[^>]+>/g, '') || 'No excerpt available.'

          return (
            <Link
              key={id || index} // Using ID or index if ID is unavailable
              href={`/interview/${slug || ''}`} // Fallback to empty slug if not available
              aria-label={title || 'Untitled Interview'}
              passHref
              className='mx-auto flex flex-col md:flex-row shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 border-2 border-black'
            >
              <div className='relative h-60 w-full md:w-1/3'>
                <div className='relative w-full h-full'>
                  <img
                    src={imageUrl || '/fallback-image.jpg'}
                    alt={title || 'Interview Image'}
                    className='object-cover w-full h-full'
                  />
                </div>
              </div>

              <div className='p-6 flex flex-col justify-between w-full md:w-2/3 relative'>
                <div className='bg-gradient-to-tl from-blue-400 to-blue-900 text-white pt-1 font-semibold px-2 absolute h-8 w-40 top-0 font-2xl items-center text-center rounded-br-md rounded-bl-md'>
                  INTERVIEW
                </div>
                <h2 className='text-2xl font-semibold text-gray-800 line-clamp-2 mt-4'>
                  {title || 'Untitled Interview'}
                </h2>
                <p className='text-base text-gray-600 line-clamp-3'>
                  {sanitizedExcerpt.split(' ').slice(0, 65).join(' ') + '...'}
                </p>
                <div className='flex'>
                  <p className='text-sm font-normal'>
                    By {authorName.toUpperCase()}
                  </p>
                  <span className='mx-2'></span>
                  <p className='text-sm font-normal'>{formattedDate}</p>
                </div>
              </div>
            </Link>
          )
        })}

        {data?.interviews?.pageInfo?.hasNextPage && (
          <div className='text-center mt-8'>
            <button
              onClick={handleLoadMore}
              className='px-6 py-2 bg-red-500 text-white rounded-md hover:bg-green-400 transition'
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
