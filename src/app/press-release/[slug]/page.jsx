import { gql } from '@apollo/client'
import server from '../../../lib/apolloserver'
import ArticleContent from './ArticleContent'

const GET_ARTICLE_META = gql`
  query MyQuery($slug: ID!) {
    pressRelease(id: $slug, idType: SLUG) {
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

  const { data } = await server.query({
    query: GET_ARTICLE_META,
    variables: { slug },
  })

  const article = data?.pressRelease
  const title = article?.title || 'Default Title'
  const excerpt =
    article?.excerpt?.replace(/<[^>]+>/g, '') || 'Default description.'
  const imageUrl =
    article?.featuredImage?.node?.sourceUrl || 'default-image.jpg'

  return {
    title: title,

    description: excerpt,
    openGraph: {
      title,
      description: excerpt,
      url: `https://tokenheadline.com/press-release/${slug}`,
      type: 'article',
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
