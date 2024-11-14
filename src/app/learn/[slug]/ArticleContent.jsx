'use client'
import React, { useEffect, useState } from 'react'
import { GET_COURSE } from '../../../../services'
import client from '../../../lib/apolloClient'
import DOMPurify from 'dompurify'

const ArticleContent = ({ slug }) => {
  const [courseData, setCourseData] = useState(null)
  const [error, setError] = useState(null)
  const [sanitizedContent, setSanitizedContent] = useState('')

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const { data } = await client.query({
          query: GET_COURSE,
          variables: { slug },
        })

        const course = data?.course
        if (course) {
          setCourseData(course)
          setSanitizedContent(
            DOMPurify.sanitize(course.content || '<p>Loading...</p>')
          )
        }
      } catch (err) {
        setError('Course could not be loaded.')
        console.error(err)
      }
    }

    if (slug) {
      fetchCourse()
    }
  }, [slug])

  if (error) {
    return <p className='text-red-500'>{error}</p>
  }

  if (!courseData) {
    return <p>Loading...</p>
  }

  return (
    <div>
      <h1 className='text-3xl md:text-4xl font-bold text-center mb-4'>
        {courseData.title}
      </h1>
      <div className='relative h-96 w-full rounded-lg overflow-hidden mb-6'>
        <div className='relative w-full h-full'>
          <img
            src={courseData.featuredImage.node.sourceUrl}
            alt={courseData.title}
            className='rounded-lg object-cover w-full h-full'
            style={{
              objectFit: 'cover',
            }}
          />
        </div>
      </div>

      <p
        className={`text-sm font-medium text-center ${getLevelColor(
          courseData.level.level
        )}`}
      >
        Level: {courseData.level.level}
      </p>

      <div
        className='mt-6 prose lg:prose-lg text-gray-800 mx-auto'
        dangerouslySetInnerHTML={{
          __html: sanitizedContent,
        }}
      />
    </div>
  )
}

const getLevelColor = (level) => {
  if (level === 'beginner') return 'text-green-500'
  if (level === 'intermediate') return 'text-orange-500'
  if (level === 'expert') return 'text-red-500'
  return 'text-gray-500'
}

export default ArticleContent
