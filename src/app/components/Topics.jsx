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
  { name: 'FUNDAMENTAL ANALYSIS', newsCount: 18, imageUrl: '/fundamental.png' },
  { name: 'ETHEREUM', newsCount: 18, imageUrl: '/technology.png' },

  // Add more topics here...
]

const Topics = () => {
  return (
    <div className='container mt-8'>
      <h2 className='text-3xl sm:text-4xl lg:text-4xl font-bold mb-8'>
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
        </span>
        CRYPTO AND WEB3 WORLD NEWS & TIPS...
      </h2>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
        {topicsData.map((topic, index) => (
          <div
            key={index}
            className=' flex flex-col p-4 hover:bg-blue-300 transition duration-300 cursor-pointer 
            shadow-md'
            style={{ width: 'auto', maxWidth: '100%' }} // Adjust width based on image
          >
            {/* Topic Name and News Count */}
            <div className='flex justify-between items-start'>
              <h3 className='text-base sm:text-lg md:text-xl font-bold'>
                {topic.name} {topic.newsCount}
              </h3>
              <span className='text-xs sm:text-sm text-gray-500 font-bold'>
                View All
              </span>
            </div>

            {/* Separator Line */}
            <hr className='my-4 border-black' />

            {/* Topic Image */}

            <Image
              src={topic.imageUrl}
              alt={topic.name}
              height={400}
              width={300}
              className='border-2 border-black'
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Topics
