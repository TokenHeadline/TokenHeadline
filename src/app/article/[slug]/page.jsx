import React from 'react'
import ArticleContent from './ArticleContent'
import { GET_ARTICLE_METADATA } from '../../../../services/index'
import client from '../../../lib/apolloClient'

// Optimized GraphQL query to only fetch the necessary data for metadata and page content
export const GET_ARTICLE_METADATA = `
  query GetArticleMetadata($slug: String!) {
    post(slug: $slug) {
      title
      excerpt
      slug
      featuredImage {
        node {
          sourceUrl
        }
      }
    }
  }
`

// This function is for dynamically generating metadata for the page
export async function generateMetadata({ params }) {
  const { slug } = params

  // Fetching only the necessary data for the article based on the slug
  const { data: articleData } = await client.query({
    query: GET_ARTICLE_METADATA,
    variables: { slug },
  })

  // Prepare metadata object
  const metadata = {
    title: articleData.post.title,
    description:
      articleData.post.excerpt
        .replace(/<[^>]+>/g, '') // Remove HTML tags
        .split(' ')
        .slice(0, 30)
        .join(' ') + '...', // Limit description length
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
      image:
        articleData.post.featuredImage?.node.sourceUrl || '/default-image.jpg',
    },
  }

  return metadata
}

const Page = async ({ params }) => {
  const { slug } = params

  // Fetching only the necessary data for the article based on the slug
  const { data: articleData } = await client.query({
    query: GET_ARTICLE_METADATA,
    variables: { slug },
  })

  return (
    <div className='container pt-0 pb-4 max-w-6xl mx-auto px-2'>
      <ArticleContent slug={slug} articleData={articleData} />
    </div>
  )
}

export default Page
