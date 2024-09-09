import React from 'react'
import Image from 'next/image'

const ArticlesGrid = ({ News }) => {
  return (
    <div className='m-4 pt-5 md:pl-16 md:pr-16'>
      <h1 className='text-3xl sm:text-4xl lg:text-5xl font-bold mt-12'>
        LATEST ARTICLES
      </h1>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 py-4 mt-10'>
        {News.slice(1, 7).map((news, index) => (
          <div className='overflow-hidden shadow-md backdrop-blur-md bg-white/40 rounded-md'>
            <div className='relative w-full h-48'>
              <Image
                src={news.featuredImage}
                alt={news.title}
                layout='fill'
                objectFit='cover'
              />
            </div>

            <div className='p-4'>
              <h2 className='text-lg sm:text-xl font-semibold mb-2'>
                {news.title}
              </h2>
              <p className='text-sm text-gray-700 mb-4'>
                {news.content.split(' ').slice(0, 30).join(' ') + '...'}
              </p>

              <div className='flex flex-col sm:flex-row sm:justify-between text-sm text-black mt-10'>
                <p>By {news.author.name}</p>
                <p>{news.date}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ArticlesGrid
