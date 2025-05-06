import { gql } from '@apollo/client'
import server from '../../../lib/apolloserver'
import ArticleContent from './ArticleContent'

const GET_ARTICLE_META = gql`
  query MyQuery($slug: ID!) {
    post(id: $slug, idType: SLUG) {
      slug
      seo {
        title
        description
        openGraph {
          image {
            url
          }
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

  const article = data?.post
  const title = article?.seo?.title || 'Default Title'
  const description = article?.seo?.description || 'Default description.'
  const imageUrl = article?.seo?.openGraph?.image?.url || 'default-image.jpg'

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://tokenheadline.com/article/${slug}`,
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
      description,
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
