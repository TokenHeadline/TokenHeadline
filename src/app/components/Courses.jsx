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
      try {
        const { data } = await client.query({
          query: GET_COURSES,
        })
        setCourses(data?.courses?.nodes || []) // Fallback to an empty array if data is missing
      } catch (error) {
        console.error('Error fetching courses:', error)
        setCourses([]) // Set to an empty array in case of error
      }
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
    return 'bg-gray-500' // Default color for unknown levels
  }

  return (
    <div className='py-10'>
      <h1 className='text-3xl sm:text-4xl lg:text-5xl font-bold mb-10'>
        LEARN
      </h1>
      {courses.length > 0 ? (
        <Carousel
          responsive={responsive}
          infinite={true}
          keyBoardControl={true}
          autoPlay={true}
          containerClass='carousel-container'
          itemClass='px-4'
        >
          {courses.map((course, index) => {
            const imageUrl =
              course?.featuredImage?.node?.sourceUrl || '/default-image.png' // Fallback to default image
            const title = course?.title || 'Untitled Course' // Fallback title
            const slug = course?.slug || '#' // Fallback slug
            const level = course?.level?.level || 'unknown' // Fallback level

            return (
              <div
                key={course.id || index} // Use course ID if available, otherwise index
                className={`relative bg-white rounded-xl overflow-hidden ${
                  index % 2 === 0 ? 'hover:bg-red-400' : 'hover:bg-green-300'
                } transition duration-300`}
              >
                <Image
                  src={imageUrl}
                  alt={title}
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
                <Link href={`/learn/${slug}`}>
                  <div className='p-5'>
                    <h2 className='text-3xl font-semibold text-gray-800 mb-2'>
                      {title}
                    </h2>
                    <div className='flex items-center mt-5'>
                      <div
                        className={`w-3 h-3 rounded-full mr-2 ${getLevelColor(
                          level
                        )}`}
                      ></div>
                      <span className='font-medium text-sm capitalize text-gray-700'>
                        {level}
                      </span>
                    </div>
                  </div>
                </Link>
              </div>
            )
          })}
        </Carousel>
      ) : (
        <p className='text-center text-gray-500'>
          No courses available at the moment
        </p>
      )}
    </div>
  )
}

export default Courses
