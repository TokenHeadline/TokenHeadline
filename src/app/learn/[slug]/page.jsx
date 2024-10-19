import React from 'react'
import { GET_COURSE, GET_RECENT_COURSES } from '../../../../services/index'
import client from '../../../lib/apolloClient'
import Image from 'next/image'
import { RichText } from '@graphcms/rich-text-react-renderer'

export async function generateMetadata({ params }) {
  const { slug } = params

  const { data } = await client.query({
    query: GET_COURSE,
    variables: { slug },
  })

  const course = data.courses[0]

  if (!course) {
    return {
      title: 'Course not found',
      description: 'The requested course does not exist.',
    }
  }

  return {
    title: course.seoTitle || course.title,
    description: course.metaDescription || 'Default description if none is provided',
  }
}

const CoursePage = async ({ params }) => {
  const { slug } = params

  const { data } = await client.query({
    query: GET_COURSE,
    variables: { slug },
  })

  const course = data.courses[0]

  if (!course) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <p className='text-xl font-semibold text-red-500'>Course not found</p>
      </div>
    )
  }

  const richTextRenderers = {
    h1: ({ children }) => (
      <h1 className='text-3xl font-extrabold text-gray-900 my-4 text-center'>
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className='text-2xl font-bold text-gray-800 my-3 text-center'>
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className='text-xl font-semibold text-gray-800 my-2 text-center'>
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className='text-lg font-semibold text-gray-800 my-2 text-center'>
        {children}
      </h4>
    ),
    h5: ({ children }) => (
      <h5 className='text-md font-semibold text-gray-800 my-2 text-center'>
        {children}
      </h5>
    ),
    h6: ({ children }) => (
      <h6 className='text-sm font-semibold text-gray-800 my-2 text-center'>
        {children}
      </h6>
    ),
    p: ({ children }) => (
      <p className='text-base text-gray-600 my-2 text-center'>{children}</p>
    ),
    ul: ({ children }) => <ul className='list-disc pl-6 my-4'>{children}</ul>,
    ol: ({ children }) => <ol className='list-decimal pl-6 my-4'>{children}</ol>,
    li: ({ children }) => <li className='my-1'>{children}</li>,
    img: ({ src, alt }) => (
      <Image
        src={src}
        alt={alt}
        width={800}
        height={500}
        className='rounded-lg my-5 w-full h-auto text-center'
      />
    ),
  }

  return (
    <div className='container mx-auto max-w-7xl px-4 lg:px-8 py-2 pb-6'>
    

      <div className='flex flex-col lg:flex-row gap-10'>
        <div className='bg-white shadow-lg rounded-lg p-6 flex-1'>
          <h1 className='text-3xl md:text-4xl font-bold text-center mb-4'>
            {course.title}
          </h1>
          <div className='relative h-60 w-full rounded-lg overflow-hidden mb-6'>
            <Image
              src={course.featuredImage.url}
              alt={course.title}
              layout='fill'
              objectFit='cover'
              className='rounded-lg'
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

          <div className='mt-6'>
            <RichText
              content={course.content.raw}
              renderers={richTextRenderers}
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
