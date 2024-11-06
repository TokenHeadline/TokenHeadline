'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import { useQuery } from '@apollo/client'
import { GET_CATEGORY_ARTICLE } from '../../../../services'
import client from '../../../lib/apolloClient'
import Link from 'next/link'

const ArticlesPage = ({ params }) => {
  const ARTICLES_PER_PAGE = 6
  const [cursor, setCursor] = useState(null)
  const { loading, error, data } = useQuery(GET_CATEGORY_ARTICLE, {
    client,
    variables: {
      first: ARTICLES_PER_PAGE,
      after: cursor,
      category: params.category, // Pass the category slug from the page params
    },
    onCompleted: (newData) => {
      if (newData?.posts?.pageInfo?.endCursor) {
        setCursor(newData.posts.pageInfo.endCursor)
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
      <p className='text-center text-lg text-red-500'>Error loading articles</p>
    )

  const articles = data?.posts?.edges || []

  return (
    <div className='container items-center mx-auto lg:px-14 md:px-12 px-8 '>
      <div className='grid grid-cols-1 gap-8 items-center mb-10'>
        <head>
          <title>Explore Articles from TokenHeadline</title>
          <meta
            name='description'
            content='Discover a diverse collection of expert-written articles on various topics from TokenHeadline.'
          />
        </head>
        {articles.map(({ node: news }, index) => (
          <Link
            href={`/article/${news.slug}`}
            aria-label={`${news.slug}`}
            passHref
            className='mx-auto flex flex-col md:flex-row shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 border-2 border-black'
            key={index}
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
              <div className='bg-orange-500 text-black font-semibold px-2 absolute h-8 w-40 top-0 font-2xl items-center text-center'>
                {news.categories.nodes[0]?.name.toUpperCase()}
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

      {/* Pagination Controls */}
      {data?.posts?.pageInfo?.hasNextPage && (
        <div className='mt-12 flex justify-center items-center space-x-6 mb-2'>
          <button
            className={`px-5 py-2 border-2 transition-all duration-300 text-lg font-medium ${
              !cursor
                ? 'border-gray-300 text-gray-300 cursor-not-allowed'
                : 'border-red-500 text-red-500 hover:bg-red-500 hover:text-white'
            }`}
            onClick={() => setCursor(data.posts.pageInfo.endCursor)}
            disabled={!cursor}
          >
            Load More
          </button>
        </div>
      )}

      {/* Pagination Navigation */}
      <div className='mt-12 flex justify-center items-center space-x-6 mb-2'>
        <button
          className={`px-5 py-2 border-2 transition-all duration-300 text-lg font-medium ${
            cursor === null
              ? 'border-gray-300 text-gray-300 cursor-not-allowed'
              : 'border-red-500 text-red-500 hover:bg-red-500 hover:text-white'
          }`}
          onClick={() => setCursor(data.posts.pageInfo.endCursor)}
          disabled={cursor === null}
        >
          Previous
        </button>
        <span className='text-lg font-semibold text-gray-700'>
          Page <span className='text-red-600'>{currentPage}</span> of{' '}
          <span className='text-green-600'>{totalPages}</span>
        </span>
        <button
          className={`px-5 py-2  border-2 transition-all duration-300 text-lg font-medium ${
            currentPage === totalPages
              ? 'border-gray-300 text-gray-300 cursor-not-allowed'
              : 'border-green-500 text-green-500 hover:bg-green-500 hover:text-white'
          }`}
          onClick={() => nextPage()}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default ArticlesPage
