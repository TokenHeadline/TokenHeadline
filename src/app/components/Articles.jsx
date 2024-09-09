import React from 'react'
import { HiArrowSmallRight } from 'react-icons/hi2'
import Link from 'next/link'

const Articles = ({ News }) => {
  return (
    <div
      className='container lg:pl-10 p-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6
    lg:gap-0 lg:w-3/12'
    >
      {News.slice(1, 5).map((article) => (
        <div key={article.id}>
          <h2 className='text-sm sm:text-base md:text-lg lg:text-xl font-bold leading-6'>
            {article.subheading}
          </h2>
          <div className='flex items-center justify-between mt-2 lg:ml-5'>
            <div className='flex flex-col lg:flex-row'>
              <div className='mr-4'>
                <p className='text-sm sm:text-sm font-bold'>
                  {article.category}
                </p>
              </div>
              <p className='text-sm sm:text-sm text-black lg:ml-2'>
                By {article.author.name}
              </p>
            </div>
            <Link href={`/article/${article.title}`}>
              <HiArrowSmallRight className='w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8' />
            </Link>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Articles
