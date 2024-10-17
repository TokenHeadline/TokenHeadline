'use client'
import React from 'react'
import { useQuery } from '@apollo/client'
import client from '../../../lib/apolloClient'
import { GET_COURSE } from '../../../../services/index'
import Image from 'next/image'
import { RichText } from '@graphcms/rich-text-react-renderer'

const CoursePage = ({ params }) => {
  const { slug } = params

  const { loading, error, data } = useQuery(GET_COURSE, {
    client,
    variables: { slug },
    skip: !slug,
  })

  if (loading) return <p className='text-center text-lg h-screen'>Loading...</p>
  if (error)
    return (
      <p className='text-center text-lg text-red-500'>Error loading course</p>
    )

  const course = data?.courses[0]

  if (!course) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <p className='text-xl font-semibold text-red-500'>Course not found</p>
      </div>
    )
  }

  const richTextRenderers = {
    h2: ({ children }) => (
      <h2 className='text-2xl font-bold text-gray-800 my-3 mx-auto'>
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className='text-xl font-semibold text-gray-800 my-2 mx-auto'>
        {children}
      </h3>
    ),
    p: ({ children }) => (
      <p className='text-base text-gray-600 my-2 mx-auto'>{children}</p>
    ),
    ul: ({ children }) => (
      <ul className='list-disc pl-6 my-4 mx-auto'>{children}</ul>
    ),
    ol: ({ children }) => (
      <ol className='list-decimal pl-6 my-4 mx-auto'>{children}</ol>
    ),
    li: ({ children }) => <li className='my-1 mx-auto'>{children}</li>,
    img: ({ src, alt }) => (
      <Image
        src={src}
        alt={alt}
        width={800}
        height={500}
        className='rounded-lg my-5 mx-auto'
      />
    ),
  }

  return (
    <div className='container mx-auto px-8 lg:px-14 md:px-12 py-8'>
      <div className='bg-white shadow-lg rounded-lg p-6'>
        <h1 className='text-4xl font-bold text-center mb-4'>{course.title}</h1>
        <div className='relative h-60 w-full md:w-2/3 mx-auto mt-4 mb-6 rounded-lg overflow-hidden'>
          <Image
            src={course.featuredImage.url}
            alt={course.title}
            className='rounded-lg mb-6 mx-auto'
            width={800}
            height={500}
          />
        </div>
        <p
          className={`text-sm font-medium text-center ${getLevelColor(
            course.courselevel
          )}`}
        >
          Level: {course.courselevel}
        </p>
        <p className='text-base text-gray-700 mt-4 text-center'>
          {course.courseDescription}
        </p>

        <div className='mt-6 justify-center'>
          <RichText
            content={course.content.raw}
            renderers={richTextRenderers}
          />
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
