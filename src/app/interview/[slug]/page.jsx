import React from 'react'
import ArticleContent from './ArticleContent'
import { gql } from '@apollo/client'
import client from '../../../lib/apolloClient'

const GET_ARTICLE_META = gql`
  query MyQuery($slug: ID!) {
    interview(id: $slug, idType: SLUG) {
      excerpt
      title
      slug
      featuredImage {
        node {
          sourceUrl
        }
      }
    }
  }
`

export async function generateMetadata({ params }) {
  const { slug } = params

  const { data } = await client.query({
    query: GET_ARTICLE_META,
    variables: { slug },
  })

  const article = data.interview

  const openGraphMetadata = {
    title: article.title,
    description:
      article.excerpt
        .replace(/<[^>]+>/g, '')
        .split(' ')
        .slice(0, 30)
        .join(' ') + '...', // Limit description to 30 words
    openGraph: {
      title: article.title,
      description:
        article.excerpt
          .replace(/<[^>]+>/g, '')
          .split(' ')
          .slice(0, 30)
          .join(' ') + '...',
      url: `https://tokenheadline.com/article/${article.slug}`,
      type: 'article',
      siteName: 'Token Headline',
      images: [
        {
          url: article.featuredImage?.node.sourceUrl || '/default-image.jpg',
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description:
        article.excerpt
          .replace(/<[^>]+>/g, '')
          .split(' ')
          .slice(0, 30)
          .join(' ') + '...',
      image: article.featuredImage?.node.sourceUrl || '/default-image.jpg',
    },
  }

  return openGraphMetadata
}

const Page = ({ params }) => {
  const { slug } = params

  return (
    <div className='container pt-0 pb-4 max-w-6xl mx-auto px-2'>
      <ArticleContent slug={slug} />
    </div>
  )
}

export default Page
