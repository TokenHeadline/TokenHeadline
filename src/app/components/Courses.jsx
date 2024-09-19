'use client'
import React from 'react'
import Image from 'next/image'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'

const Courses = ({ Course }) => {
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 1301 },
      items: 3,
    },
    desktop: {
      breakpoint: { max: 1300, min: 800 },
      items: 2,
    },
    tablet: {
      breakpoint: { max: 800, min: 677 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 676, min: 0 },
      items: 1,
    },
  }

  const getLevelColor = (level) => {
    if (level === 'beginner') return 'bg-green-500'
    if (level === 'intermediate') return 'bg-orange-500'
    if (level === 'expert') return 'bg-red-500'
    return 'bg-gray-500'
  }

  return (
    <div className=' py-10'>
      <h1 className='text-3xl sm:text-4xl lg:text-5xl font-bold  mb-10'>
        LEARN
      </h1>
      <Carousel
        responsive={responsive}
        infinite={true}
        keyBoardControl={true}
        autoPlay={true}
        containerClass='carousel-container'
        itemClass='px-4'
      >
        {Course.courses.map((course, index) => (
          <div
            key={index}
            className='relative bg-white rounded-xl overflow-hidden shadow- '
          >
            <Image
              src={course.featuredImage}
              alt={course.name}
              width={500}
              height={250}
              // fill
              style={{ objectFit: 'cover' }}
              className='w-full h-56'
            />
            <div className='p-5'>
              <h2 className='text-3xl font-semibold text-gray-800 mb-2'>
                {course.name}
              </h2>
              <div className='flex items-center mt-5'>
                <div
                  className={`w-3 h-3 rounded-full mr-2 ${getLevelColor(
                    course.level
                  )}`}
                ></div>
                <span className='font-medium text-sm capitalize text-gray-700'>
                  {course.level}
                </span>
              </div>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  )
}

export default Courses
