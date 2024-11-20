import React from 'react'
import ArticleContent from './ArticleContent'
import { GET_ARTICLE } from '../../../../services/index'
import client from '../../../lib/apolloClient'
export async function generateMetadata({ params }) {
  const { slug } = params
  const { data: articleData } = await client.query({
    query: GET_ARTICLE,
    variables: { slug },
  })
  return {
    title: articleData.post.title,
    description:
      articleData.post.excerpt
        .replace(/<[^>]+>/g, '')
        .split(' ')
        .slice(0, 30)
        .join(' ') + '...',
    image: articleData.post.featuredImage?.node.sourceUrl,
    url: 'https://tokenheadline.com/article/' + articleData.post.slug,
    type: 'article',
    siteName: 'Token Headline',
  }
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
