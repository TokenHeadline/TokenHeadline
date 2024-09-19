import React from 'react'
import Image from 'next/image'

const Today = ({ News }) => {
  return (
    <div className='flex flex-col lg:pl-6 lg:pt-0 p-4 md:basis-6/12 xl:basis-4/12'>
      {News.slice(0, 1).map((article, index) => (
        <div key={index} className='space-y-4'>
          <h1 className='text-3xl sm:text-4xl lg:text-5xl font-bold'>
            TODAY RELEASE
          </h1>
          <h2 className='text-xl sm:text-2xl md:text-3xl font-bold'>
            {article.subheading}
          </h2>
          <div className='flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-8 text-sm sm:text-base'>
            <p className='font-bold'>{article.category}</p>
            <p className='text-gray-500'>By {article.author.name}</p>
            <p className='text-gray-500'>{article.date}</p>
          </div>

          <p className='text-base sm:text-lg md:text-xl'>
            {article.content.split(' ').slice(0, 20).join(' ') + '...'}
          </p>

          <div className='flex justify-center'>
            <div className='relative inline-block mt-3'>
              <div className='absolute inset-0 pointer-events-none'>
                <div className='absolute -top-2 -left-2 w-8 h-8 border-t-2 border-l-2 border-black'>
                  <div className='absolute -top-1 -left-1 w-2 h-2 bg-black rounded-br-full'></div>
                </div>
                <div className='absolute -top-1.5 -right-1.5 w-8 h-8 border-t-2 border-r-2 border-black'>
                  <div className='absolute -top-0 -right-0 w-2 h-2 bg-black rounded-bl-full'></div>
                </div>
                <div className='absolute -bottom-1.5 -left-1.5 w-8 h-8 border-b-2 border-l-2 border-black'>
                  <div className='absolute -bottom-0 -left-0 w-2 h-2 bg-black rounded-tr-full'></div>
                </div>
                <div className='absolute -bottom-2 -right-2 w-8 h-8 border-b-2 border-r-2 border-black'>
                  <div className='absolute -bottom-1 -right-1 w-2 h-2 bg-black rounded-tl-full'></div>
                </div>
              </div>
              <div className='grayscale'>
                <Image
                  src={'/today.png'}
                  alt={article.title}
                  width={400}
                  height={300} // Keeping both width and height in proportion
                  priority={true}
                  style={{ width: '100%', height: 'auto' }} // Ensuring aspect ratio with CSS
                />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Today
