import React from 'react'

const TodaySkeleton = () => {
  return (
    <div className='flex flex-col lg:pl-6 lg:pt-0 p-4 md:basis-6/12 xl:basis-4/12'>
      <h1 className='text-3xl sm:text-4xl lg:text-5xl font-bold'>
        TODAY RELEASE
      </h1>
      <div className='h-6 bg-gray-300 rounded-md w-64 mb-4 animate-pulse'></div>
      <div className='flex space-x-4 mb-4'>
        <div className='h-4 bg-gray-300 rounded-md w-20 animate-pulse'></div>
        <div className='h-4 bg-gray-300 rounded-md w-32 animate-pulse'></div>
        <div className='h-4 bg-gray-300 rounded-md w-28 animate-pulse'></div>
        <div className='h-4 bg-gray-300 rounded-md w-28 animate-pulse'></div>
      </div>
      <div className='h-6 bg-gray-300 rounded-md w-full mb-4 animate-pulse'></div>
      <div className='h-64 bg-gray-300 rounded-md animate-pulse'></div>
    </div>
  )
}

export default TodaySkeleton
