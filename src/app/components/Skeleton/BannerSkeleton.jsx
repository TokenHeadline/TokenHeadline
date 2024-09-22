import React from 'react'

const BannerSkeleton = () => {
  return (
    <div className='relative flex justify-center items-center'>
      <ul className='relative xl:w-[400px] xl:h-[520px] lg:h-[420px] lg:w-[250px] lg:p-10 mt-16 lg:mt-0 w-[650px] h-[300px]'>
        {Array(3)
          .fill()
          .map((_, index) => (
            <li
              key={index}
              className='absolute w-full h-full bg-gray-300 rounded-lg animate-pulse'
            >
              <div className='absolute bottom-2 left-2 h-4 w-40 bg-gray-300 animate-pulse rounded-md'></div>
            </li>
          ))}
      </ul>
    </div>
  )
}

export default BannerSkeleton
