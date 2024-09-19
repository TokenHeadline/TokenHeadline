import React from 'react'
import Image from 'next/image'

const topicsData = [
  { name: 'ALL', newsCount: 50, imageUrl: '/all.png' },
  { name: 'BLOCKCHAIN', newsCount: 18, imageUrl: '/blockchain.png' },
  {
    name: 'TECHNICAL ANALYSIS',
    newsCount: 18,
    imageUrl: '/technical.png',
  },
  { name: 'BITCOIN', newsCount: 18, imageUrl: '/bitcoin.png' },
  { name: 'FUNDAMENTAL', newsCount: 18, imageUrl: '/fundamental.png' },
  { name: 'ETHEREUM', newsCount: 18, imageUrl: '/technology.png' },

  // Add more topics here...
]

const Topics = () => {
  return (
    <div className=' mt-8 '>
      <div className='flex flex-row justify-between mb-8 '>
        <h2 className='text-3xl sm:text-4xl lg:text-5xl font-bold'>
          READ UP ON THE{' '}
          <span
            className='underline'
            style={{
              textDecorationThickness: '1.5px',
              textDecorationColor: 'black',
              textUnderlineOffset: '4px',
            }}
          >
            LATEST
          </span>{' '}
          CRYPTO AND WEB3 WORLD NEWS & TIPS...
        </h2>
        <Image
          src={'/GoDown.png'}
          alt='Go Down'
          width={100}
          height={50}
          className='items-center m-4 -mt-4 xl:mr-20 hidden md:block lg:block xl:block'
          style={{ width: '100px', height: '100px' }}
        />
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
        {topicsData.map((topic, index) => (
          <div
            key={index}
            className=' flex flex-col p-4 hover:bg-blue-300 transition duration-300 cursor-pointer 
            shadow-md'
            style={{ width: 'auto', maxWidth: '100%' }} // Adjust width based on image
          >
            <div className='flex justify-between items-start'>
              <h3 className='text-base sm:text-lg md:text-lg font-bold'>
                {topic.name} {topic.newsCount}
              </h3>
              <span className='text-xs sm:text-sm text-gray-600 font-bold'>
                View All
              </span>
            </div>
            <hr className='my-4 border-black' />
            <div className='flex justify-center'>
              <Image
                src={topic.imageUrl}
                alt={topic.name}
                height={400}
                width={300}
                className='border-2 border-black '
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Topics
