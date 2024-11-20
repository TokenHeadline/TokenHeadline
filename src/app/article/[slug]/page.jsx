// app/articles/[slug]/page.js
import { gql } from '@apollo/client'
import client from '@/lib/apolloClient'
import ArticleContent from './ArticleContent'

const GET_ARTICLE_META = gql`
  query MyQuery($slug: ID!) {
    post(id: $slug, idType: SLUG) {
      excerpt
      slug
      title
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

  const article = data?.post || {}

  const { title, excerpt, featuredImage } = article

  const metadataBase = 'https://tokenheadline.com'

  return {
    metadataBase, // Set metadataBase here
    title: title || 'Default Title',
    description: excerpt || 'Default description',
    openGraph: {
      title: title || 'Default Title',
      description: excerpt || 'Default description',
      images: featuredImage?.node?.sourceUrl
        ? [{ url: new URL(featuredImage.node.sourceUrl, metadataBase).href }]
        : [],
    },
    twitter: {
      title: title || 'Default Title',
      description: excerpt || 'Default description',
      images: featuredImage?.node?.sourceUrl
        ? [{ url: new URL(featuredImage.node.sourceUrl, metadataBase).href }]
        : [],
    },
  }
}

export default async function Page({ params }) {
  const { slug } = params

  return (
    <div className='container pt-0 pb-4 max-w-6xl mx-auto px-2'>
      <ArticleContent slug={slug} />
    </div>
  )
}
