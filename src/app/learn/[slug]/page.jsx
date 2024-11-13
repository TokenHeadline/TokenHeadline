import React from 'react'
import Image from 'next/image'
import { GET_COURSE } from '../../../../services'
import client from '../../../lib/apolloClient'
import ArticleContent from './ArticleContent'

const getLevelColor = (level) => {
  if (level === 'beginner') return 'text-green-500'
  if (level === 'intermediate') return 'text-orange-500'
  if (level === 'expert') return 'text-red-500'
  return 'text-gray-500'
}

export async function generateMetadata({ params }) {
  const { slug } = params

  try {
    const { data } = await client.query({
      query: GET_COURSE,
      variables: { slug },
    })

    const course = data.course

    return {
      title: course.title || 'Untitled Course',
      description:
        course.excerpt.replace(/<[^>]+>/g, '') || 'No description available',
      openGraph: {
        type: 'article',
        url: `https://tokenheadline.com/course/${slug}`,
        title: course.title,
        description:
          course.excerpt.replace(/<[^>]+>/g, '') || 'No description available',
        images: [
          {
            url: course.featuredImage.node.sourceUrl || '/default-image.jpg',
          },
        ],
      },
    }
  } catch (error) {
    return {
      title: 'Course Not Found',
      description: 'This course could not be found.',
    }
  }
}

const CoursePage = async ({ params }) => {
  const { slug } = params

  const { data } = await client.query({
    query: GET_COURSE,
    variables: { slug },
  })

  const course = data?.course

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
        <div className='bg-white shadow-lg rounded-lg p-6 flex-1'>
          <h1 className='text-3xl md:text-4xl font-bold text-center mb-4'>
            {course.title}
          </h1>
          <div className='relative h-96 w-full rounded-lg overflow-hidden mb-6'>
            <div className='relative w-full h-full'>
              <img
                src={course.featuredImage.node.sourceUrl}
                alt={course.title}
                className='rounded-lg object-cover w-full h-full'
                style={{
                  objectFit: 'cover', // Ensure the image covers the container area
                }}
              />
            </div>
          </div>

          <p
            className={`text-sm font-medium text-center ${getLevelColor(
              course.level.level
            )}`}
          >
            Level: {course.level.level}
          </p>
          <div className='mt-6 prose lg:prose-lg text-gray-800 mx-auto'>
            <ArticleContent content={course.content || '<p>Loading...</p>'} />
          </div>
        </div>
      </div>
    </div>
  )
}

export const revalidate = 600

export default CoursePage
