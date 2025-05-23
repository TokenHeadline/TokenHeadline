'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import { useQuery } from '@apollo/client'
import { GET_ALL_OPINIONS } from '../../../services'
import client from '../../lib/apolloClient'
import Link from 'next/link'

const OpinionPage = () => {
  const [cursor, setCursor] = useState(null)
  const [articles, setArticles] = useState([])

  const { loading, error, data } = useQuery(GET_ALL_OPINIONS, {
    client,
    variables: {
      first: 5,
      after: cursor,
    },
    onCompleted: (newData) => {
      if (newData?.opinions?.edges) {
        setArticles((prevArticles) => [
          ...prevArticles,
          ...newData.opinions.edges.map((edge) => edge.node),
        ])
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
    const month = months[date.getMonth()] || 'UNKNOWN'

    return `${day} ${month} ${year}`
  }

  const handleLoadMore = () => {
    if (data?.opinions?.pageInfo?.endCursor) {
      setCursor(data.opinions.pageInfo.endCursor) // Set the new cursor
    }
  }

  if (loading && articles.length === 0)
    return <p className='text-center text-lg h-screen'>Loading...</p>
  if (error)
    return (
      <p className='text-center text-lg text-red-500'>Error loading articles</p>
    )

  return (
    <div className='container items-center mx-auto lg:px-14 md:px-12 px-8 '>
      <div className='grid grid-cols-1 gap-8 items-center'>
        {articles.map((news) => {
          const title = news?.title || 'Untitled Article'
          const imageUrl =
            news?.featuredImage?.node?.sourceUrl || '/default-image.jpg'
          const excerpt =
            (news?.excerpt || '')
              .replace(/<[^>]+>/g, '')
              .split(' ')
              .slice(0, 65)
              .join(' ') + '...'
          const authorName =
            news?.author?.node?.name?.toUpperCase() || 'Anonymous'
          const date = news?.date
            ? formatDateWithOrdinalAndAbbreviatedMonth(news.date)
            : 'Unknown Date'

          return (
            <Link
              href={`/opinion/${news.slug}`}
              aria-label={title}
              passHref
              className='mx-auto flex flex-col md:flex-row shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 border-2 border-black'
              key={news.id}
            >
              <div className='relative h-60 w-full md:w-1/3'>
                <div className='relative w-full h-full'>
                  <img
                    src={imageUrl}
                    alt={title || 'Default Title'}
                    className='object-cover w-full h-full'
                  />
                </div>
              </div>

              <div className='p-6 flex flex-col justify-between w-full md:w-2/3 relative'>
                <div className='bg-orange-500 text-black font-semibold px-2 absolute h-8 w-40 top-0 font-2xl items-center text-center'>
                  OPINION
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
      </div>

      {/* Load More Button */}
      {data?.opinions?.pageInfo?.hasNextPage && (
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
  )
}

export default OpinionPage
