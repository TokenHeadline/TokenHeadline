'use client'
import React from 'react'
import Image from 'next/image'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'

const Courses = ({ courses }) => {
  console.log(courses)
  // Responsive settings for the carousel
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 1441 },
      items: 2,
      partialVisibilityGutter: 40,
    },
    desktop: {
      breakpoint: { max: 1440, min: 1024 },
      items: 2,
      partialVisibilityGutter: 30,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
      partialVisibilityGutter: 30,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      partialVisibilityGutter: 30,
    },
  }

  // Function to determine the level dot color
  const getLevelColor = (level) => {
    if (level === 'beginner') return 'bg-green-500'
    if (level === 'intermediate') return 'bg-orange-500'
    if (level === 'expert') return 'bg-red-500'
    return 'bg-gray-500' // fallback color
  }

  return (
    <div>
      <h1 className='text-3xl sm:text-4xl lg:text-5xl font-bold mt-12'>
        LEARN
      </h1>
      {/* <Carousel
        responsive={responsive}
        infinite={true}
        keyBoardControl={true}
        showDots={true}
        autoPlay={false}
        containerClass='carousel-container'
        itemClass='carousel-item-padding-40-px'
      >
        {courses.map((course, index) => (
          <div
            key={index}
            className='course-card'
            style={{
              width: '540px',
              height: '490px',
              backgroundColor: '#f5f5f5',
              margin: '10px',
              borderRadius: '8px',
              overflow: 'hidden',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              position: 'relative',
            }}
          >
            <Image
              src={course.featuredImage}
              alt={course.name}
              width={481}
              height={227}
              objectFit='cover'
            />

            <div style={{ padding: '20px' }}>
              <h2 className='text-xl font-bold'>{course.name}</h2>
            </div>

            {/* Level and Dot */}
      {/* <div
              className='absolute bottom-4 left-4 flex items-center'
              style={{ display: 'flex', alignItems: 'center' }}
            >
              <div
                className={`w-3 h-3 rounded-full mr-2 ${getLevelColor(
                  course.level
                )}`}
              ></div>
              <span className='font-semibold text-sm capitalize'>
                {course.level}
              </span>
            </div>
          </div>
        ))}
      </Carousel> */}
    </div>
  )
}

export default Courses
