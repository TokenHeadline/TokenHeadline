import React from 'react'

const ArticlesSkeleton = () => {
  return (
    <div className='container lg:pl-10 p-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6 lg:gap-0 lg:w-4/12'>
      {Array(5)
        .fill()
        .map((_, index) => (
          <div key={index}>
            <div className='h-6 bg-gray-300 rounded-md w-full mb-4 animate-pulse'></div>
            <div className='flex items-center justify-between mt-2 lg:ml-5'>
              <div className='h-4 bg-gray-300 rounded-md w-20 animate-pulse'></div>
              <div className='h-4 bg-gray-300 rounded-md w-32 animate-pulse'></div>
              <div className='w-6 h-6 bg-gray-300 rounded-full animate-pulse'></div>
            </div>
          </div>
        ))}
    </div>
  )
}

export default ArticlesSkeleton
