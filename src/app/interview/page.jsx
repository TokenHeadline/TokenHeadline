import React from 'react'
import Link from 'next/link'
const page = () => {
  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-900 to-black flex flex-col justify-center items-center text-center px-4'>
      <h1 className='text-5xl lg:text-7xl font-bold text-white mb-4'>
        Coming Soon
      </h1>
      <p className='text-xl lg:text-2xl text-gray-300 max-w-lg mb-6'>
        This page is currently under construction. Please check back soon for
        updates.
      </p>
      <div className='flex space-x-4'>
        <Link
          href='/'
          className='text-sm lg:text-base text-white bg-blue-600 px-6 py-3 rounded-md hover:bg-blue-700 transition'
        >
          Back to Home
        </Link>
      </div>
    </div>
  )
}

export default page
