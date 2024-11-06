// Topics.js
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const Topics = async () => {
  const categories = [
    {
      name: 'Crypto',
      slug: 'crypto',
      imageUrl: '/crypto.png',
    },
    {
      name: 'Latest Market',
      slug: 'latest-market',
      imageUrl: '/technical.png',
    },
    {
      name: 'Bitcoin',
      slug: 'bitcoin',
      imageUrl: '/bitcoin.png',
    },
    {
      name: 'Ethereum',
      slug: 'ethereum',
      imageUrl: '/ethereum.png',
    },
    {
      name: 'Blockchain',
      slug: 'blockchain',
      imageUrl: '/blockchain.png',
    },
  ]

  return (
    <div className='mt-8'>
      <div className='flex flex-row justify-between mb-8'>
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

      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-6'>
        <Link
          href={`/articles`}
          aria-label={`articles/topic`}
          className='flex flex-col p-4 hover:bg-green-300 transition duration-300 cursor-pointer shadow-md'
          style={{ width: 'auto', maxWidth: '100%' }}
        >
          <div className='flex justify-between items-start'>
            <h3 className='text-base sm:text-lg md:text-lg font-bold'>ALL</h3>
            <span className='text-xs sm:text-sm text-gray-600 font-bold'>
              View All
            </span>
          </div>
          <hr className='my-4 border-black' />
          <div className='flex justify-center'>
            <Image
              src={'/all.png'} // Replace with actual image URL
              alt={'All Topics'}
              height={400}
              width={300}
              className='border-2 border-black'
            />
          </div>
        </Link>

        {/* Dynamically render topics */}
        {categories.map((topic, index) => (
          <Link
            href={`/articles/${topic.slug}`}
            aria-label={`articles/${topic.slug}`}
            key={index}
            className={`flex flex-col p-4 transition duration-300 cursor-pointer shadow-md ${
              index % 2 === 0 ? ' hover:bg-red-400' : ' hover:bg-green-300'
            }`}
            style={{ width: 'auto', maxWidth: '100%' }}
          >
            <div className='flex justify-between items-start'>
              <h3 className='text-base sm:text-lg md:text-lg font-bold'>
                {topic.name.toUpperCase()}
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
                className='border-2 border-black'
              />
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Topics
