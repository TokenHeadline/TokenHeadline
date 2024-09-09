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
          className='grid grid-cols-1 lg:grid-cols-5 gap-6 items-center mb-6'
          key={index}
        >
          {/* Content and Author Info */}
          <div className='lg:col-span-3'>
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
                {newsItem.content.split(' ').slice(0, 70).join(' ') + '...'}
              </p>
            </div>
          </div>

          {/* Featured Image */}
          <div className='lg:col-span-2'>
            <div className='w-full'>
              <Image
                src='https://academy-public.coinmarketcap.com/srd-optimized-uploads/8c7120162f7b4284978cbf50108fe7b0.webp'
                width={630}
                height={500}
                alt={newsItem.title}
                className='object-cover'
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
