// File: Page.js or the appropriate filename in your project

import ArticleContent from './ArticleContent'

const GET_ARTICLE_META = `
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

// Function to fetch metadata using fetch instead of Apollo Client
export async function generateMetadata({ params }) {
  const { slug } = params

  // Fetch article meta data using fetch
  const res = await fetch('https://cms.tokenheadline.com/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: GET_ARTICLE_META,
      variables: { slug },
    }),
  })

  const { data } = await res.json()

  const article = data?.interview
  const title = article?.title || 'Default Title'
  const excerpt =
    article?.excerpt?.replace(/<[^>]+>/g, '') || 'Default description.'
  const imageUrl =
    article?.featuredImage?.node?.sourceUrl || 'default-image.jpg'

  return {
    title,
    description: excerpt,
    openGraph: {
      title,
      description: excerpt,
      url: `https://yourwebsite.com/interview/${slug}`,
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

// Page component to render the article content
const Page = async ({ params }) => {
  const { slug } = params

  return (
    <div className='container pt-0 pb-4 max-w-6xl mx-auto px-2'>
      <ArticleContent slug={slug} />
    </div>
  )
}

export default Page
