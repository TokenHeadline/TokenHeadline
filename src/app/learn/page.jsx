'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import { useQuery } from '@apollo/client'
import client from '../../lib/apolloClient'
import Link from 'next/link'
import { gql } from '@apollo/client'
import { GET_ALL_COURSES } from '../../../services'

const CoursesPage = () => {
  const COURSES_PER_PAGE = 6
  const [currentPage, setCurrentPage] = useState(1)
  const { loading, error, data } = useQuery(GET_ALL_COURSES, {
    client,
    variables: {
      limit: COURSES_PER_PAGE,
      offset: (currentPage - 1) * COURSES_PER_PAGE,
    },
  })

  const getLevelColor = (level) => {
    if (level === 'beginner') return 'bg-green-500'
    if (level === 'intermediate') return 'bg-orange-500'
    if (level === 'expert') return 'bg-red-500'
    return 'bg-gray-500'
  }

  if (loading) return <p className='text-center text-lg h-screen'>Loading...</p>
  if (error)
    return (
      <p className='text-center text-lg text-red-500'>Error loading courses</p>
    )

  const courses = data?.courses || []
  const totalCourses = data?.coursesConnection?.aggregate?.count || 0
  const totalPages = Math.ceil(totalCourses / COURSES_PER_PAGE)

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  const previousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  return (
    <div className='container items-center mx-auto lg:px-14 md:px-12 px-8 mt-5'>
      <div className='grid grid-cols-1 gap-8 items-center'>
        <head>
          <title>Explore Courses from CloudlearnN</title>
          <meta
            name='description'
            content='Discover a diverse collection of courses on various topics from CloudlearnN.'
          />
        </head>
        {courses.map((course, index) => (
          <div
            className='mx-auto flex flex-col md:flex-row shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 border-2 border-black'
            key={index}
          >
            <div className='relative h-60 w-full md:w-1/3'>
              <Image
                src={course.featuredImage.url}
                alt={course.title}
                fill
                className='object-cover'
              />
            </div>

            <div className='p-6 flex flex-col justify-between w-full md:w-2/3 relative'>
              <h2 className='text-2xl font-semibold text-gray-800 line-clamp-2 mt-4'>
                {course.title}
              </h2>
              <p className='text-base text-gray-600 line-clamp-3'>
                {course.courseDescription.split(' ').slice(0, 40).join(' ') +
                  '...'}
              </p>
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

              {/* Black line below the course level */}
              <div className='border-t border-black my-2'></div>

              {/* Start Course link with arrow */}
              <Link href={`/learn/${course.slug}`} passHref>
                <span className='ml-auto cursor-pointer flex items-center'>
                  Start Course
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-6 w-6 ml-2'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M8 12h8m0 0l-4-4m4 4l-4 4'
                    />
                  </svg>
                </span>
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div className='mt-12 flex justify-center items-center space-x-6 mb-2'>
        <button
          className={`px-5 py-2 border-2 transition-all duration-300 text-lg font-medium ${
            currentPage === 1
              ? 'border-gray-300 text-gray-300 cursor-not-allowed'
              : 'border-red-500 text-red-500 hover:bg-red-500 hover:text-white'
          }`}
          onClick={previousPage}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className='text-lg font-semibold text-gray-700'>
          Page <span className='text-red-600'>{currentPage}</span> of{' '}
          <span className='text-green-600'>{totalPages}</span>
        </span>
        <button
          className={`px-5 py-2 border-2 transition-all duration-300 text-lg font-medium ${
            currentPage === totalPages
              ? 'border-gray-300 text-gray-300 cursor-not-allowed'
              : 'border-green-500 text-green-500 hover:bg-green-500 hover:text-white'
          }`}
          onClick={nextPage}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default CoursesPage
