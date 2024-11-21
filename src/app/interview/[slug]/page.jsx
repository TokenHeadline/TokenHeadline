// app/[slug]/page.js or app/[slug]/page.tsx
import { gql } from '@apollo/client'
import client from '../../../lib/apolloClient'
import ArticleContent from './ArticleContent'

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

  const article = data?.interview

  if (article) {
    return {
      title: article.title,
      description: article.excerpt,
      openGraph: {
        title: article.title,
        description: article.excerpt,
        image: article.featuredImage?.node?.sourceUrl || '',
      },
      twitter: {
        title: article.title,
        description: article.excerpt,
        image: article.featuredImage?.node?.sourceUrl || '',
      },
    }
  }

  return {
    title: 'Article Not Found',
    description: 'This article does not exist.',
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
