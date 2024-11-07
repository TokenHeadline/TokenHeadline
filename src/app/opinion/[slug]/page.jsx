import { GET_OPINION, GET_RECENT_ARTICLES } from '../../../../services/index'
import client from '../../../lib/apolloClient'
import Image from 'next/image'
import Link from 'next/link'
import Cryptowidget from '../../components/Cryptowidget'
import ArticleContent from '../../../lib/ArticleContent'

// Generate metadata for the Opinion article
export async function generateMetadata({ params }) {
  const { slug } = params

  try {
    const { data } = await client.query({
      query: GET_OPINION,
      variables: { slug },
    })

    const article = data?.opinion

    if (!article) {
      return {
        title: 'Opinion Not Found',
        description: 'This opinion article could not be found.',
      }
    }

    return {
      title: article.title || 'Untitled Article',
      description:
        article.excerpt.replace(/<[^>]+>/g, '') || 'No description available',
      openGraph: {
        type: 'article',
        url: `https://tokenheadline.com/opinion/${slug}`,
        title: article.title,
        description:
          article.excerpt.replace(/<[^>]+>/g, '') || 'No description available',
        images: [
          {
            url: article.featuredImage?.node?.sourceUrl || '/default-image.jpg',
          },
        ],
      },
    }
  } catch (error) {
    console.error('Error generating metadata:', error)
    return {
      title: 'Opinion Not Found',
      description: 'This opinion article could not be found.',
    }
  }
}

// The Opinion Page component
const Page = async ({ params }) => {
  const { slug } = params

  let article = null
  try {
    // Fetch the opinion article based on slug
    const { data } = await client.query({
      query: GET_OPINION,
      variables: { slug },
    })
    article = data?.opinion
  } catch (error) {
    console.error('Error fetching article:', error)
  }

  if (!article) {
    // Return a fallback UI when the article is not found
    return (
      <div className='container mx-auto px-4 lg:px-0 pt-0 pb-4 max-w-6xl'>
        <div className='text-center py-10'>
          <h1 className='text-3xl font-semibold text-gray-900'>
            Opinion Not Found
          </h1>
          <p className='text-gray-500'>
            The requested opinion article could not be found.
          </p>
        </div>
      </div>
    )
  }

  // Fetch the recent articles for the sidebar
  const { data: recentData } = await client.query({
    query: GET_RECENT_ARTICLES,
  })

  // Filter out the current article from the list of recent articles
  const filteredArticles = recentData.posts.nodes.filter(
    (recentArticle) => recentArticle.slug !== slug
  )

  return (
    <div className='container mx-auto px-4 lg:px-0 pt-0 pb-4 max-w-6xl'>
      <div className='mx-auto p-6'>
        <div className='mb-10'>
          <div className='items-center text-center'>
            <h1 className='text-4xl sm:text-5xl font-extrabold text-gray-900 mb-6'>
              {article.title || 'No Title'}
            </h1>
            <Image
              src={article.featuredImage?.node?.sourceUrl || 'logo.png'}
              alt={article.title || 'No Title'}
              width={800}
              height={450}
              className='rounded-lg mb-6 mx-auto'
            />
            <div className='flex justify-center text-gray-700 text-sm mb-4 flex-wrap'>
              <span className='mr-4'>
                By {article.author?.node?.name || 'Unknown Author'}
              </span>
              <span>
                {new Date(article.date).toLocaleDateString() || 'Unknown Date'}
              </span>
            </div>
          </div>
          <div className='prose lg:prose-lg text-gray-800 mx-auto'>
            <ArticleContent content={article.content || '<p>Loading....</p>'} />
          </div>
        </div>
      </div>

      <div className='container mx-auto px-4 lg:px-0 pt-0 pb-4 max-w-6xl flex flex-col md:flex-row'>
        <div className='max-w-full md:max-w-2xl mx-5 bg-gray-50 shadow-lg rounded-lg border border-gray-200 p-6 flex-1 mb-4 md:mb-0'>
          <h2 className='text-3xl font-semibold text-gray-800 mb-6'>
            Recent Articles
          </h2>
          <ul>
            {filteredArticles.map((recentArticle, index) => (
              <li key={index} className='flex items-center mb-4'>
                <Image
                  src={
                    recentArticle.featuredImage?.node?.sourceUrl || '/logo.png'
                  }
                  alt={recentArticle.title || 'No Title'}
                  width={100}
                  height={60}
                  className='rounded-md mr-4'
                />
                <div>
                  <Link
                    href={`/opinion/${recentArticle.slug}`}
                    className='text-gray-900 hover:text-blue-600 hover:underline'
                  >
                    {recentArticle.title || 'No Title'}
                  </Link>
                  <span className='text-gray-500 text-xs block mt-1'>
                    {new Date(recentArticle.date).toLocaleDateString() ||
                      'Unknown Date'}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className='flex-none md:w-1/3'>
          <Cryptowidget />
        </div>
      </div>
    </div>
  )
}

export default Page

// Generate static paths for the Opinion article slugs
export async function generateStaticParams() {
  const { data } = await client.query({
    query: GET_RECENT_ARTICLES, // Or use GET_OPINION to fetch only opinion articles
  })

  const slugs = data.posts.nodes.map((post) => post.slug)

  return slugs.map((slug) => ({
    slug,
  }))
}

// Revalidate every 10 seconds to ensure fresh content
export const revalidate = 10
