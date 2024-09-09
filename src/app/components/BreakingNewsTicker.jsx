import React from 'react'

const BreakingNewsTicker = ({ News }) => {
  return (
    <div className='relative overflow-hidden whitespace-nowrap py-6 text-black px-4'>
      <div className='absolute inset-0 flex items-center animate-marquee'>
        {News.filter((newsItem) => newsItem.carouselSubheading).map(
          (newsItem, index) => (
            <div className='px-10 text-base' key={index}>
              <span className='font-semibold px-3'>BREAKING NEWS</span>
              <span>{newsItem.title}</span>
            </div>
          )
        )}
      </div>
    </div>
  )
}

export default BreakingNewsTicker
