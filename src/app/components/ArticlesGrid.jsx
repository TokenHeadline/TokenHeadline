import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const ArticlesGrid = ({ News }) => {
  return (
    <div className='m-4 pt-5 md:pl-16 md:pr-16 xl:pl-16'>
      <h1 className='text-3xl sm:text-4xl lg:text-5xl font-bold mt-12'>
        LATEST ARTICLES
      </h1>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 py-4 mt-10'>
        {News.slice(1, 7).map((news, index) => (
          <div
            className='flex flex-col justify-between overflow-hidden shadow-md backdrop-blur-md bg-white/40 h-full'
            key={index}
          >
            {/* Image Section */}
            <div className='relative w-full h-48'>
              <Image
                src={news.featuredImage}
                alt={news.title}
                fill
                sizes='(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 33vw'
                style={{ objectFit: 'cover' }}
              />
            </div>

            {/* Content Section */}
            <div className='p-4 flex-grow'>
              <h2 className='text-lg sm:text-xl font-semibold mb-2'>
                {news.title}
              </h2>
              <p className='text-sm text-gray-700 mb-4'>
                {news.content.split(' ').slice(0, 30).join(' ') + '...'}
              </p>
            </div>

            {/* Author and Date Section */}
            <div className='p-4 mt-auto'>
              <div className='flex justify-between text-sm text-black'>
                <p>By {news.author.name}</p>
                <p>{news.date}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className='text-center mt-8'>
        <Link
          href='/articles'
          className='inline-block px-6 py-2 text-white bg-black rounded-md shadow-md hover:bg-blue-700 transition-colors mb-4'
        >
          Read More
        </Link>
      </div>
    </div>
  )
}

export default ArticlesGrid
