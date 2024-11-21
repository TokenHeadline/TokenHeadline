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

  // Fetch article meta data using Apollo Client
  const { data } = await client.query({
    query: GET_ARTICLE_META,
    variables: { slug },
  })

  const article = data?.interview
  const title = article?.title || 'Default Title'
  const excerpt = article?.excerpt || 'Default description.'
  const imageUrl =
    article?.featuredImage?.node?.sourceUrl || 'default-image.jpg'

  return {
    title,
    description: excerpt,
    openGraph: {
      title,
      description: excerpt,
      images: [
        {
          url: imageUrl,
          width: 800,
          height: 600,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: excerpt,
      images: [imageUrl],
    },
  }
}

const Page = async ({ params }) => {
  const { slug } = params

  return (
    <div className='container pt-0 pb-4 max-w-6xl mx-auto px-2'>
      <ArticleContent slug={slug} />
    </div>
  )
}

export default Page
