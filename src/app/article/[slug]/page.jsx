import React from 'react'
import ArticleContent from './ArticleContent'
import { GET_ARTICLE } from '../../../../services/index'
import client from '../../../lib/apolloClient'

// This function is for dynamically generating metadata for the page
export async function generateMetadata({ params }) {
  const { slug } = params

  // Fetching article data based on slug
  const { data: articleData } = await client.query({
    query: GET_ARTICLE,
    variables: { slug },
  })

  // Prepare metadata object
  const metadata = {
    title: articleData.post.title,
    description:
      articleData.post.excerpt
        .replace(/<[^>]+>/g, '')
        .split(' ')
        .slice(0, 30)
        .join(' ') + '...',
    openGraph: {
      title: articleData.post.title,
      description:
        articleData.post.excerpt
          .replace(/<[^>]+>/g, '')
          .split(' ')
          .slice(0, 30)
          .join(' ') + '...',
      url: `https://tokenheadline.com/article/${articleData.post.slug}`,
      type: 'article',
      siteName: 'Token Headline',
      images: [
        {
          url:
            articleData.post.featuredImage?.node.sourceUrl ||
            '/default-image.jpg',
          width: 1200,
          height: 630,
          alt: articleData.post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: articleData.post.title,
      description:
        articleData.post.excerpt
          .replace(/<[^>]+>/g, '')
          .split(' ')
          .slice(0, 30)
          .join(' ') + '...',
      images: [
        articleData.post.featuredImage?.node.sourceUrl || '/default-image.jpg',
      ],
    },
  }

  return metadata
}

const Page = async ({ params }) => {
  const { slug } = params

  // Fetching article data based on slug
  const { data: articleData } = await client.query({
    query: GET_ARTICLE,
    variables: { slug },
  })

  return (
    <div className='container pt-0 pb-4 max-w-6xl mx-auto px-2'>
      <ArticleContent slug={slug} articleData={articleData} />
    </div>
  )
}

export default Page
