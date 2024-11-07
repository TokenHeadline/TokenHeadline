'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import DOMPurify from 'dompurify'
import { GET_COURSE } from '../../../../services'
import client from '../../../lib/apolloClient'

const CoursePage = ({ params }) => {
  const { slug } = params
  const [course, setCourse] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true) // Set loading to true before fetching
      try {
        const { data } = await client.query({
          query: GET_COURSE,
          variables: { slug },
        })
        setCourse(data.course)
      } catch (err) {
        setError(err) // Store error if any
        console.error('Error fetching course:', err)
      } finally {
        setLoading(false) // Set loading to false after fetch attempt
      }
    }

    fetchData()
  }, [slug])
  // console.log(course.content)
  if (loading) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <p className='text-xl font-semibold text-green-500'>Loading....</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <p className='text-xl font-semibold text-red-500'>
          Error: {error.message}
        </p>
      </div>
    )
  }

  if (!course) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <p className='text-xl font-semibold text-red-500'>Course not found</p>
      </div>
    )
  }

  return (
    <div className='container mx-auto max-w-7xl px-4 lg:px-8 py-2 pb-6'>
      <div className='flex flex-col lg:flex-row gap-10'>
        <head>
          <title>{course.title}</title>
          <meta
            name='description'
            content={course.excerpt || 'No description available'}
          ></meta>
        </head>
        <div className='bg-white shadow-lg rounded-lg p-6 flex-1'>
          <h1 className='text-3xl md:text-4xl font-bold text-center mb-4'>
            {course.title}
          </h1>
          <div className='relative h-60 w-full rounded-lg overflow-hidden mb-6'>
            <Image
              src={course.featuredImage.node.sourceUrl}
              alt={course.title}
              layout='fill'
              objectFit='cover'
              className='rounded-lg'
            />
          </div>
          <p
            className={`text-sm font-medium text-center ${getLevelColor(
              course.level.level
            )}`}
          >
            Level: {course.level.level}
          </p>
          <div className='mt-6 prose lg:prose-lg text-gray-800 mx-auto'>
            <div
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(course.content),
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

const getLevelColor = (level) => {
  if (level === 'beginner') return 'text-green-500'
  if (level === 'intermediate') return 'text-orange-500'
  if (level === 'expert') return 'text-red-500'
  return 'text-gray-500'
}

export default CoursePage
