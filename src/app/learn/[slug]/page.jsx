import React from 'react'
import ArticleContent from './ArticleContent'
import client from '../../../lib/apolloClient'
import { GET_COURSE } from '../../../../services/index'
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
        url: `https://tokenheadline.com/learn/${slug}`,
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

const CoursePage = ({ params }) => {
  const { slug } = params

  return (
    <div className='container mx-auto max-w-7xl px-4 lg:px-8 py-2 pb-6'>
      <div className='flex flex-col lg:flex-row gap-10'>
        <div className='bg-white shadow-lg rounded-lg p-6 flex-1'>
          <ArticleContent slug={slug} />
        </div>
      </div>
    </div>
  )
}

export default CoursePage
