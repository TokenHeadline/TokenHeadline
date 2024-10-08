import React from 'react'
import { HiArrowSmallRight } from 'react-icons/hi2'
import Link from 'next/link'
import { GET_ARTICLES } from '../../../services/index'
import client from '../../lib/apolloClient'
import ArticlesSkeleton from './Skeleton/ArticlesSkeleton'

const Articles = async () => {
  // Fetch data on the server side
  const { data } = await client.query({
    query: GET_ARTICLES,
  })

  const News = data.articles

  // Handle case when there are no articles
  if (!News || News.length === 0) {
    return <ArticlesSkeleton />
  }

  // Determine the number of articles to show based on viewport width
  const articlesToShow =
    typeof window !== 'undefined' && window.innerWidth < 640
      ? News.slice(1, 4)
      : News.slice(1, 6)

  return (
    <div className='container lg:pl-10 p-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6 lg:gap-0 lg:w-4/12'>
      {articlesToShow.map((article) => (
        <div key={article.id}>
          <h2 className='text-base sm:text-lg md:text-lg lg:text-xl font-bold leading-6'>
            {article.subheading}
          </h2>
          <div className='flex items-center justify-between mt-2 lg:ml-5'>
            <div className='flex flex-col lg:flex-row'>
              <div className='mr-4'>
                <p className='text-sm sm:text-sm font-bold'>
                  {article.category.name.toUpperCase()}
                </p>
              </div>
              <p className='text-sm sm:text-sm text-black lg:ml-2'>
                By {article.author.name}
              </p>
            </div>
            <Link
              href={`/article/${article.slug}`}
              aria-label={`/article/${article.slug}`}
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
