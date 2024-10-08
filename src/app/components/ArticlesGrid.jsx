// ArticlesGridServer.js
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { GET_ARTICLE_FOR_GRID } from '../../../services/index'
import client from '../../lib/apolloClient'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'

const formatDateWithOrdinalAndAbbreviatedMonth = (dateStr) => {
  const date = new Date(dateStr)
  const day = date.getDate()
  const year = date.getFullYear()

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
  const month = months[date.getMonth()]

  const getOrdinal = (day) => {
    if (day > 3 && day < 21) return 'th'
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

const ArticlesCarousel = async () => {
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 1301 },
      items: 3,
    },
    desktop: {
      breakpoint: { max: 1300, min: 800 },
      items: 2,
    },
    tablet: {
      breakpoint: { max: 800, min: 677 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 677, min: 0 },
      items: 1,
    },
  }

  const { data } = await client.query({
    query: GET_ARTICLE_FOR_GRID,
  })

  const News = data?.articles || []

  return (
    <div className='m-4 pt-5 md:pl-16 md:pr-16 xl:pl-16'>
      <h1 className='text-3xl sm:text-4xl lg:text-5xl font-bold mt-12'>
        LATEST ARTICLES
      </h1>
      <Carousel responsive={responsive} className='py-4 mt-10'>
        {News.map((news, index) => (
          <Link
            href={`/article/${news.slug}`}
            aria-label={`/article/${news.slug}`}
            className='flex flex-col justify-between overflow-hidden shadow-md backdrop-blur-md bg-white/40 h-full p-4'
            key={index}
          >
            <div className='relative w-full h-48'>
              <Image
                src={news.featuredImage.url}
                alt={news.title}
                fill
                sizes='(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 33vw'
                style={{ objectFit: 'cover' }}
              />
            </div>

            <h2 className='text-lg sm:text-xl font-semibold mb-2'>
              {news.title}
            </h2>
            <p className='text-sm text-gray-700 mb-4'>
              {news.excerpt.split(' ').slice(0, 30).join(' ') + '...'}
            </p>

            <div className='flex justify-between text-sm text-black'>
              <p>By {news.author.name}</p>
              <p>{formatDateWithOrdinalAndAbbreviatedMonth(news.date)}</p>
            </div>
          </Link>
        ))}
      </Carousel>

      <div className='text-center mt-8'>
        <Link
          href='/articles'
          className='inline-block px-6 py-2 text-white bg-black rounded-md shadow-md hover:bg-blue-700 transition-colors mb-4'
        >
          More Articles
        </Link>
      </div>
    </div>
  )
}

export default ArticlesCarousel
