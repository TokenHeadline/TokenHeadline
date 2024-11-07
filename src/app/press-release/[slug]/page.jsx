import {
  GET_PRESS_RELEASE,
  GET_RECENT_ARTICLES,
} from '../../../../services/index'
import client from '../../../lib/apolloClient'
import Image from 'next/image'
import Link from 'next/link'
import Cryptowidget from '../../components/Cryptowidget'
import ArticleContent from '../../../lib/ArticleContent'

// Generate metadata for the Press Release article
export async function generateMetadata({ params }) {
  const { slug } = params

  try {
    const { data } = await client.query({
      query: GET_PRESS_RELEASE,
      variables: { slug },
    })

    const article = data.pressRelease

    // Ensure article exists before generating metadata
    if (!article) {
      return {
        title: 'Article Not Found',
        description: 'This article could not be found.',
        openGraph: {
          type: 'article',
          url: `https://tokenheadline.com/press-release/${slug}`,
          title: 'Article Not Found',
          description: 'This article could not be found.',
          images: [{ url: '/default-image.jpg' }],
        },
      }
    }

    return {
      title: article.title || 'Untitled Article',
      description:
        article.excerpt.replace(/<[^>]+>/g, '') || 'No description available',
      openGraph: {
        type: 'article',
        url: `https://tokenheadline.com/press-release/${slug}`,
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
      title: 'Article Not Found',
      description: 'This article could not be found.',
    }
  }
}

// The Press Release Page Component
const Page = async ({ params }) => {
  const { slug } = params

  try {
    // Fetch the press release article based on the slug
    const { data } = await client.query({
      query: GET_PRESS_RELEASE,
      variables: { slug },
    })

    const article = data.pressRelease

    if (!article) {
      return (
        <div className='flex justify-center items-center h-screen'>
          <p className='text-xl font-semibold text-red-500'>
            Article not found
          </p>
        </div>
      )
    }

    // Fetch the recent articles for the sidebar
    const { data: recentData } = await client.query({
      query: GET_RECENT_ARTICLES,
    })

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
                  {new Date(article.date).toLocaleDateString() ||
                    'Unknown Date'}
                </span>
              </div>
            </div>
            <div className='prose lg:prose-lg text-gray-800 mx-auto'>
              <ArticleContent
                content={article.content || '<p>Loading....</p>'}
              />
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
                      recentArticle.featuredImage?.node?.sourceUrl ||
                      '/logo.png'
                    }
                    alt={recentArticle.title || 'No Title'}
                    width={100}
                    height={60}
                    className='rounded-md mr-4'
                  />
                  <div>
                    <Link
                      href={`/article/${recentArticle.slug}`}
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
  } catch (error) {
    console.error('Error loading article:', error)
    return (
      <div className='flex justify-center items-center h-screen'>
        <p className='text-xl font-semibold text-red-500'>Article not found</p>
      </div>
    )
  }
}

export default Page

// Static Paths for press release
export async function generateStaticParams() {
  try {
    const { data } = await client.query({
      query: GET_RECENT_ARTICLES, // This should fetch your press release slugs
    })

    const slugs = data.posts.nodes.map((post) => post.slug)

    return slugs.map((slug) => ({
      slug,
    }))
  } catch (error) {
    console.error('Error fetching slugs:', error)
    return []
  }
}

// Revalidate every 10 seconds
export const revalidate = 10
