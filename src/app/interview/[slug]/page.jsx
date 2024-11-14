import React from 'react'
import ArticleContent from './ArticleContent'
import client from '../../../lib/apolloClient'
import { GET_INTERVIEW } from '../../../../services/index'
export async function generateMetadata({ params }) {
  const { slug } = params

  try {
    const { data } = await client.query({
      query: GET_INTERVIEW,
      variables: { slug },
    })

    const article = data?.interview

    if (!article) {
      return {
        title: 'Interview Not Found',
        description: 'This interview could not be found.',
      }
    }

    return {
      title: article.title || 'Untitled interview',
      description:
        article.excerpt?.replace(/<[^>]+>/g, '') || 'No description available',
      openGraph: {
        type: 'article',
        url: `https://tokenheadline.com/interview/${slug}`,
        title: article.title,
        description:
          article.excerpt?.replace(/<[^>]+>/g, '') ||
          'No description available',
        images: [
          {
            url: article.featuredImage?.node?.sourceUrl || '/default-image.jpg',
          },
        ],
      },
    }
  } catch (error) {
    console.error('Error generating metadata:', error)
    return {
      title: 'Interview Not Found',
      description: 'This interview could not be found.',
    }
  }
}
const Page = ({ params }) => {
  const { slug } = params

  return (
    <div className='container mx-auto px-4 lg:px-0 pt-0 pb-4 max-w-6xl'>
      <ArticleContent slug={slug} />
    </div>
  )
}

export default Page
