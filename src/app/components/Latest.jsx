import React from 'react'
import Image from 'next/image'

const Latest = ({ News }) => {
  return (
    <div className='p-4'>
      <h1 className='text-3xl sm:text-4xl lg:text-5xl font-bold '>
        LATEST NEWS
      </h1>
      {News.slice(0, 1).map((newsItem, index) => (
        <div
          className='flex flex-col lg:flex-row gap-6 items-center mb-6'
          key={index}
        >
          {/* Content and Author Info */}
          <div className='flex-1'>
            <div className='flex items-center space-x-4 p-4'>
              <Image
                src='https://media.licdn.com/dms/image/v2/D4D03AQFpI2pUVXS7ew/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1686243239728?e=1732752000&v=beta&t=VgLtWR1vlpg_f4kZAMAJ5PMnBcjrfBY9n9DKOMC-a5k'
                width={33}
                height={38}
                alt={newsItem.author.name}
                className='rounded-full'
                style={{ width: '33px', height: '38px' }}
              />
              <p className='text-lg font-bold'>{newsItem.author.name}</p>
            </div>
            <div className='mr-0 lg:mr-20'>
              <h1 className='font-bold text-2xl md:text-3xl lg:text-4xl mb-4'>
                {newsItem.title}
              </h1>
              <p className='text-base md:text-lg'>
                {newsItem.content.split(' ').slice(0, 70).join(' ') + '...'}
              </p>
            </div>
          </div>

          <div className='flex-1'>
            <div className='w-full'>
              <Image
                src='/image.png'
                width={630}
                height={452}
                alt={newsItem.title}
                className='object-contain lg:w-[630px] lg:h-[452px]
                '
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Latest
