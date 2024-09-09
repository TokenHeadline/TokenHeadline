import React from 'react'
import Image from 'next/image'

const ArticlesGrid = ({ News }) => {
  return (
    <div className='space-y-8 m-4 lg:flex-row lg:space-x-4 lg:mt-4 lg:ml-20 lg:mr-8 pt-5'>
      <h1 className='text-3xl sm:text-4xl lg:text-5xl font-bold mt-12 '>
        LATEST ARTICLES
      </h1>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 py-4 mt-10'>
        {News.slice(0, 7).map((news, index) => (
          <div className='w-[365px] h-[473px] overflow-hidden' key={index}>
            <div className='w-[364px] h-[212px]'>
              <Image
                src={news.featuredImage}
                alt={news.title}
                width={364}
                height={212}
                className='object-cover w-full h-full'
              />
            </div>

            <div className='p-4 flex flex-col justify-between h-[261px]'>
              <div>
                <h2 className='text-xl font-semibold mb-2'>{news.title}</h2>
                <p className='text-sm text-gray-700 mb-4'>
                  {news.content.split(' ').slice(0, 30).join(' ') + '...'}
                </p>
              </div>

              <div className='mt-auto flex flex-row justify-around'>
                <p className='text-sm text-gray-500'>{news.date}</p>
                <p className='text-sm font-semibold text-gray-800'>
                  {news.author.name}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ArticlesGrid
