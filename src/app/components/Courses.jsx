'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import { GET_COURSES } from '../../../services/index'
import client from '../../lib/apolloClient'
import Link from 'next/link'
const Courses = () => {
  const [courses, setCourses] = useState([])
  const [hovered, setHovered] = useState(false)
  useEffect(() => {
    const fetchCourses = async () => {
      const { data } = await client.query({
        query: GET_COURSES,
      })
      setCourses(data?.courses || [])
    }

    fetchCourses()
  }, [])

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
    <div className='py-10'>
      <h1 className='text-3xl sm:text-4xl lg:text-5xl font-bold mb-10'>
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
        {courses.map((course, index) => (
          <div
            key={index}
            className={`relative bg-white rounded-xl overflow-hidden ${
              index % 2 === 0 ? 'hover:bg-red-400' : 'hover:bg-green-300'
            } transition duration-300`}
          >
            <Image
              src={course.featuredImage.url}
              alt={course.title}
              width={500}
              height={250}
              className='w-full h-56'
              style={{
                objectFit: 'cover',

                filter: hovered ? 'none' : 'grayscale(100%)',
                transition: 'filter 0.3s ease',
              }}
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
            />
            <Link href={`/learn/${course.slug}`}>
              <div className='p-5'>
                <h2 className='text-3xl font-semibold text-gray-800 mb-2'>
                  {course.title}
                </h2>
                <div className='flex items-center mt-5'>
                  <div
                    className={`w-3 h-3 rounded-full mr-2 ${getLevelColor(
                      course.courselevel
                    )}`}
                  ></div>
                  <span className='font-medium text-sm capitalize text-gray-700'>
                    {course.courselevel}
                  </span>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </Carousel>
    </div>
  )
}

export default Courses
