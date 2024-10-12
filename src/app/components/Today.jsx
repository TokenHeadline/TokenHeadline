import React from 'react'
import Image from 'next/image'
import TodaySkeleton from './Skeleton/TodaySkeleton'
import { GET_TODAY } from '../../../services/index'
import client from '../../lib/apolloClient'
import Link from 'next/link'

const formatDateWithOrdinalAndAbbreviatedMonth = (dateStr) => {
  const date = new Date(dateStr)
  const day = date.getDate()
  const year = date.getFullYear()

  // Abbreviated month array
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sept',
    'Oct',
    'Nov',
    'Dec',
  ]
  const month = months[date.getMonth()] // Get the correct abbreviated month

  // Function to add the correct ordinal suffix to the day
  const getOrdinal = (day) => {
    if (day > 3 && day < 21) return 'th' // covers 11th to 19th
    switch (day % 10) {
      case 1:
        return 'st'
      case 2:
        return 'nd'
      case 3:
        return 'rd'
      default:
        return 'th'
    }
  }

  return `${day}${getOrdinal(day)} ${month} ${year}`
}

const Today = async () => {
  // Fetch data on the server side
  const { data } = await client.query({
    query: GET_TODAY,
  })
  // console.log(data)
  const News = data.articles

  // If loading, you can return a skeleton component or a loading state
  if (!News || News.length === 0) {
    return <TodaySkeleton />
  }

  return (
    <div className='flex flex-col lg:pl-6 lg:pt-0 p-4 md:basis-6/12 xl:basis-4/12'>
      {News.map((article, index) => (
        <div key={index} className='space-y-4'>
          <h1 className='text-3xl sm:text-4xl lg:text-5xl font-bold'>
            RECENT RELEASE
          </h1>

          <Link
            href={`/article/${article.slug}`}
            aria-label={`/article/${article.slug}`}
            className='text-xl sm:text-2xl md:text-3xl font-bold'
          >
            {article.subheading}
          </Link>

          <div className='flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-8 text-sm sm:text-base'>
            <p className='font-bold'>{article.category.name.toUpperCase()}</p>
            <p className='text-black'>By {article.author.name}</p>
            <p className='text-black'>
              {formatDateWithOrdinalAndAbbreviatedMonth(article.date)}
            </p>
          </div>

          <p className='text-base sm:text-lg md:text-xl'>
            {article.excerpt.split(' ').slice(0, 20).join(' ') + '...'}
          </p>

          <div className='flex justify-center'>
            <div className='relative inline-block mt-3'>
              <div className='absolute inset-0 pointer-events-none'>
                <div className='absolute -top-2 -left-2 w-8 h-8 border-t-2 border-l-2 border-black'>
                  <div className='absolute -top-1 -left-1 w-2 h-2 bg-black rounded-br-full'></div>
                </div>
                <div className='absolute -top-1.5 -right-1.5 w-8 h-8 border-t-2 border-r-2 border-black'>
                  <div className='absolute -top-0 -right-0 w-2 h-2 bg-black rounded-bl-full'></div>
                </div>
                <div className='absolute -bottom-1.5 -left-1.5 w-8 h-8 border-b-2 border-l-2 border-black'>
                  <div className='absolute -bottom-0 -left-0 w-2 h-2 bg-black rounded-tr-full'></div>
                </div>
                <div className='absolute -bottom-2 -right-2 w-8 h-8 border-b-2 border-r-2 border-black'>
                  <div className='absolute -bottom-1 -right-1 w-2 h-2 bg-black rounded-tl-full'></div>
                </div>
              </div>
              <div className='grayscale'>
                <Image
                  src={article.featuredImage.url}
                  alt={article.subheading}
                  width={400}
                  height={300}
                  priority={true}
                  style={{ width: '100%', height: 'auto' }}
                />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Today
