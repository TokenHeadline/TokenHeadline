'use client'
import React, { useState } from 'react'
import { useQuery } from '@apollo/client'
import { GET_ALL_ARTICLES } from '../../../services' // Use your defined query
import client from '../../lib/apolloClient'
import Link from 'next/link'

const ArticlesPage = () => {
  const [cursor, setCursor] = useState(null)
  const [articles, setArticles] = useState([])

  const { loading, error, data } = useQuery(GET_ALL_ARTICLES, {
    client,
    variables: {
      first: 5,
      after: cursor,
    },
    onCompleted: (newData) => {
      if (newData?.posts?.edges) {
        setArticles((prevArticles) => [
          ...prevArticles,
          ...newData.posts.edges.map((edge) => edge.node),
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
    const month = months[date.getMonth()]

    return `${day} ${month} ${year}`
  }

  const handleLoadMore = () => {
    if (data?.posts?.pageInfo?.endCursor) {
      setCursor(data.posts.pageInfo.endCursor) // Set the new cursor
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
        {articles.map((news) => (
          <Link
            href={`/article/${news.slug || 'placeholder-slug'}`}
            aria-label={news.title || 'Placeholder Title'}
            passHref
            className='mx-auto flex flex-col md:flex-row shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 border-2 border-black'
            key={news.id || 'placeholder-id'}
          >
            <div className='relative h-60 w-full md:w-1/3'>
              <div className='relative w-full h-full'>
                <img
                  src={news.featuredImage?.node?.sourceUrl || '/logo.png'}
                  alt={news.title || 'Placeholder Title'}
                  className='object-cover w-full h-full'
                />
              </div>
            </div>

            <div className='p-6 flex flex-col justify-between w-full md:w-2/3 relative'>
              <div className='bg-orange-500 text-black font-semibold px-2 absolute h-8 w-40 top-0 font-2xl items-center text-center'>
                {news.categories?.nodes[0]?.name?.toUpperCase() || 'CATEGORY'}
              </div>
              <h2 className='text-2xl font-semibold text-gray-800 line-clamp-2 mt-4'>
                {news.title || 'Placeholder Title'}
              </h2>
              <p className='text-base text-gray-600 line-clamp-3'>
                {news.excerpt
                  ? news.excerpt
                      .replace(/<[^>]+>/g, '')
                      .split(' ')
                      .slice(0, 65)
                      .join(' ') + '...'
                  : 'Placeholder excerpt...'}
              </p>
              <div className='flex'>
                <p className='text-sm font-normal'>
                  By {news.author?.node?.name?.toUpperCase() || 'AUTHOR'}
                </p>
                <span className='mx-2'></span>
                <p className='text-sm font-normal'>
                  {news.date
                    ? formatDateWithOrdinalAndAbbreviatedMonth(news.date)
                    : 'DATE'}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {data?.posts?.pageInfo?.hasNextPage && (
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

export default ArticlesPage
