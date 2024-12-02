'use client'
import React, { useEffect, useState } from 'react'
import { HiArrowSmallRight } from 'react-icons/hi2'
import Link from 'next/link'
import { GET_ARTICLES } from '../../../services/index'
import client from '../../lib/apolloClient'
import ArticlesSkeleton from './Skeleton/ArticlesSkeleton'

const Articles = () => {
  const [news, setNews] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await client.query({
          query: GET_ARTICLES,
        })
        setNews(data?.posts?.nodes || [])
      } catch (error) {
        console.error('Error fetching articles:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return <ArticlesSkeleton />
  }

  const articlesToShow =
    typeof window !== 'undefined' && window.innerWidth < 640
      ? news.slice(2, 7)
      : news.slice(2, 7)

  return (
    <div className='container lg:pl-10 p-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6 lg:gap-0 lg:w-4/12'>
      {articlesToShow.map((article) => (
        <div key={article?.id || Math.random()}>
          <h2 className='text-base sm:text-lg md:text-lg lg:text-xl font-bold leading-6'>
            {article?.title || 'Untitled Article'}
          </h2>
          <div className='flex items-center justify-between mt-2 lg:ml-5'>
            <div className='flex flex-col lg:flex-row'>
              <div className='mr-4'>
                <p className='text-sm sm:text-sm font-bold'>
                  {article?.categories?.nodes?.[0]?.name?.toUpperCase() ||
                    'Uncategorized'}
                </p>
              </div>
              <p className='text-sm sm:text-sm text-black lg:ml-2'>
                By {article?.author?.node?.name || 'Unknown Author'}
              </p>
            </div>
            <Link
              href={`/article/${article?.slug || ''}`}
              aria-label={`/article/${article?.slug || ''}`}
            >
              <HiArrowSmallRight className='w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8' />
            </Link>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Articles
