'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import { useQuery } from '@apollo/client'
import { GET_ALL_COURSES } from '../../../services'
import client from '../../lib/apolloClient'
import Link from 'next/link'

const CoursesPage = () => {
  const COURSES_PER_PAGE = 5
  const [cursor, setCursor] = useState(null) // Maintain cursor state
  const { loading, error, data } = useQuery(GET_ALL_COURSES, {
    client,
    variables: {
      first: COURSES_PER_PAGE,
      after: cursor, // Pass cursor to the query
    },
  })

  const getLevelColor = (level) => {
    if (level === 'beginner') return 'bg-green-500'
    if (level === 'intermediate') return 'bg-orange-500'
    if (level === 'expert') return 'bg-red-500'
    return 'bg-gray-500'
  }

  const handleLoadMore = () => {
    if (data?.courses?.pageInfo?.endCursor) {
      setCursor(data.courses.pageInfo.endCursor)
    }
  }

  if (loading) return <p className='text-center text-lg h-screen'>Loading...</p>
  if (error)
    return (
      <p className='text-center text-lg text-red-500'>Error loading courses</p>
    )

  const courses = data?.courses?.edges || []

  return (
    <div className='container items-center mx-auto lg:px-14 md:px-12 px-8 h-screen mt-5'>
      <div className='grid grid-cols-1 gap-8 items-center'>
        <head>
          <title>Courses</title>
          <meta
            name='description'
            content='Discover a diverse collection of courses on various topics from TokenHeadline.'
          />
        </head>
        {courses.map(({ node: course }, index) => (
          <div
            className='mx-auto flex flex-col md:flex-row shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 border-2 border-black'
            key={course.id}
          >
            <div className='relative h-60 w-full md:w-1/3'>
              <Image
                src={course.featuredImage.node.sourceUrl}
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
                {course.excerpt
                  .replace(/<[^>]+>/g, '')
                  .split(' ')
                  .slice(0, 65)
                  .join(' ') + '...'}
              </p>
              <div className='flex items-center mt-5'>
                <div
                  className={`w-3 h-3 rounded-full mr-2 ${getLevelColor(
                    course.level.level
                  )}`}
                ></div>
                <span className='font-medium text-sm capitalize text-gray-700'>
                  {course.level.level}
                </span>
              </div>

              <div className='border-t border-black my-2'></div>

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

      {data?.courses?.pageInfo?.hasNextPage && (
        <div className='text-center mt-8'>
          <button
            onClick={handleLoadMore}
            className='px-6 py-2 bg-red-500 text-white rounded-md hover:bg-green-400 transition'
          >
            {loading ? 'Loading...' : 'Load More'}
          </button>
        </div>
      )}
    </div>
  )
}

export default CoursesPage
