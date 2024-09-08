import React from 'react'
import { HiArrowSmallRight } from 'react-icons/hi2'
import Link from 'next/link'

const Articles = ({ News }) => {
  return (
    <div className='container w-3/12 lg:pl-10 p-2'>
      {News.slice(1, 5).map((article) => (
        <div key={article.id} className='mb-4'>
          <h2 className='text-base font-bold md:text-lg lg:text-xl'>
            {article.subheading}
          </h2>
          <div className='flex items-center justify-between mt-2 lg:ml-10'>
            <div className='flex flex-col lg:flex-row '>
              <div className='mr-4'>
                <p className='font-bold text-base '>{article.category}</p>
              </div>
              <p className='text-gray-500 text-base lg:ml-4'>
                By {article.author.name}
              </p>
            </div>
            <Link href={`/article/${article.title}`}>
              <HiArrowSmallRight className='w-8 h-6' />
            </Link>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Articles
