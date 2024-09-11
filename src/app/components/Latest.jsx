import React from 'react'
import Image from 'next/image'

const Latest = ({ News }) => {
  return (
    <div className='p-4'>
      <h1 className='text-3xl sm:text-4xl lg:text-5xl font-bold mb-6'>
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
                src={newsItem.author.image}
                width={33}
                height={38}
                alt={newsItem.author.name}
                className='rounded-full'
              />
              <p className='text-lg font-bold'>{newsItem.author.name}</p>
            </div>
            <div className='mr-0 lg:mr-20'>
              <h1 className='font-bold text-2xl md:text-3xl lg:text-4xl mb-4'>
                {newsItem.title}
              </h1>
              <p className='text-base md:text-lg'>
                {newsItem.content.split(' ').slice(0, 50).join(' ') + '...'}
              </p>
            </div>
          </div>

          {/* Featured Image */}
          <div className='flex-1'>
            <div className='w-full'>
              <Image
                src='/image.png'
                width={630}
                height={452}
                alt={newsItem.title}
                className='object-contain lg:w-[630px] lg:h-[452px]
                ' // For screens >=1024px, use specific dimensions
                priority={true}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Latest
