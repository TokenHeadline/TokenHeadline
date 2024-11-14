import React from 'react'
import ArticleContent from './ArticleContent'
import client from '../../../lib/apolloClient'
import { GET_ARTICLE } from '../../../../services/index'
export async function generateMetadata({ params }) {
  const { slug } = params

  try {
    const { data } = await client.query({
      query: GET_ARTICLE,
      variables: { slug },
    })

    const article = data?.post

    if (!article) {
      return {
        title: 'Article Not Found',
        description: 'This Article could not be found.',
      }
    }

    return {
      title: article.title || 'Untitled Article',
      description:
        article.excerpt?.replace(/<[^>]+>/g, '') || 'No description available',
      openGraph: {
        type: 'article',
        url: `https://tokenheadline.com/article/${slug}`,
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
      title: 'Article Not Found',
      description: 'This Article could not be found.',
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
