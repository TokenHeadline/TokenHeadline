import React from 'react'
import Image from 'next/image'

const Today = ({ News }) => {
  return (
    <div className='flex flex-col basis-1/3 lg:pl-3 lg:pt-0'>
      {News.slice(0, 1).map((article, index) => (
        <div key={index}>
          <h1 className='text-6xl font-bold'>TODAY RELEASE</h1>
          <h2 className='text-2xl pt-2 lg:mt-5 font-bold'>
            {article.subheading}
          </h2>
          <div className='flex flex-row space-x-8 text-sm'>
            <p className='pt-2 font-bold'>{article.category}</p>
            <p className='pt-2 text-gray-500'>By {article.author.name}</p>
            <p className='pt-2 text-gray-500'>{article.date}</p>
          </div>

          <p className='text-lg pt-2'>{article.content}</p>

          <div className='relative inline-block pt-2 md:text-center text-black mt-3'>
            <div className='absolute inset-0 pointer-events-none'>
              <div className='absolute -top- -left-1.5 w-8 h-8 border-t-2 border-l-2 border-black'>
                <div className=' absolute -top-0 -left-0 w-2 h-2 bg-black rounded-br-full'></div>
              </div>
              <div className='absolute -top-0 -right-1.5 w-8 h-8 border-t-2 border-r-2 border-black'>
                <div className=' absolute -top-0 -right-0 w-2 h-2 bg-black rounded-bl-full'></div>
              </div>
              <div className='absolute -bottom-1.5 -left-1.5 w-8 h-8 border-b-2 border-l-2 border-black'>
                <div className=' absolute -bottom-0 -left-0 w-2 h-2 bg-black rounded-tr-full'></div>
              </div>
              <div className='absolute -bottom-1.5 -right-1.5 w-8 h-8 border-b-2 border-r-2 border-black'>
                <div className=' absolute -bottom-0 -right-0 w-2 h-2 bg-black rounded-tl-full'></div>
              </div>
            </div>

            <Image
              src='https://img.freepik.com/free-vector/cryptocurrency-bitcoin-golden-coin-background_1017-31505.jpg?t=st=1725602614~exp=1725606214~hmac=13ec76f72876eacafbd518f7eb20fd3f552dc2b52326884fce8c66a93a8e2888&w=996'
              alt={article.title}
              width={400}
              height={300}
            />
          </div>
        </div>
      ))}
    </div>
  )
}

export default Today
