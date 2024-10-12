import React from 'react'
import { GET_ARTICLE, GET_RECENT_ARTICLES } from '../../../../services/index'
import client from '../../../lib/apolloClient'
import { RichText } from '@graphcms/rich-text-react-renderer'
import Image from 'next/image'
import Link from 'next/link'
export async function generateMetadata({ params }) {
  const { slug } = params

  const { data } = await client.query({
    query: GET_ARTICLE,
    variables: { slug },
  })

  const article = data.articles[0]

  if (!article) {
    return {
      title: 'Article not found',
      description: 'The requested article does not exist.',
    }
  }

  return {
    title: article.seoTitle || article.title,
    description:
      article.metaDescription || 'Default description if none is provided',
  }
}

const Page = async ({ params }) => {
  const { slug } = params

  // Fetch the main article
  const { data } = await client.query({
    query: GET_ARTICLE,
    variables: { slug },
  })

  const articles = data.articles

  // Fetch recent articles
  const { data: recentData } = await client.query({
    query: GET_RECENT_ARTICLES,
    variables: { slug },
  })

  const recentArticles = recentData.articles

  if (!articles || articles.length === 0) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <p className='text-xl font-semibold text-red-500'>Article not found</p>
      </div>
    )
  }

  return (
    <div className='container lg:mx-10 mx-3 md:mx-6 px-4 pb-6'>
      {/* Main Article Section */}
      <div className='bg-white shadow-lg rounded-lg border border-black p-6 mb-6'>
        {articles.map((article, index) => (
          <div key={index} className='mb-10'>
            <h1 className='text-4xl font-bold text-gray-900 mb-4 text-center'>
              {article.title}
            </h1>
            <Image
              src={article.featuredImage.url}
              alt={article.title}
              width={600}
              height={300}
              className='mx-auto rounded-lg shadow-md mb-4'
            />
            <div className='flex justify-center text-gray-700 text-sm mb-4'>
              <span className='mr-4'>By {article.author.name}</span>
              <span className='mx-4'>|</span>
              <span>{new Date(article.date).toLocaleDateString()}</span>
            </div>

            <div className='prose lg:prose-lg max-w-none text-gray-800'>
              <RichText
                content={article.content.raw}
                renderers={{
                  bold: ({ children }) => (
                    <strong className='font-semibold'>{children}</strong>
                  ),
                  underline: ({ children }) => (
                    <span className='underline'>{children}</span>
                  ),
                  italic: ({ children }) => (
                    <em className='italic'>{children}</em>
                  ),
                  img: ({ src, altText }) => (
                    <Image
                      src={src}
                      alt={altText}
                      width={800}
                      height={500}
                      className='mx-auto rounded-lg my-5 shadow-md'
                    />
                  ),
                  ul: ({ children }) => (
                    <ul className='list-disc pl-6 my-4'>{children}</ul>
                  ),
                  ol: ({ children }) => (
                    <ol className='list-decimal pl-6 my-4'>{children}</ol>
                  ),
                  li: ({ children }) => <li className='mb-2'>{children}</li>,
                  h1: ({ children }) => (
                    <h1 className='text-3xl md:text-4xl font-bold text-gray-800 my-4'>
                      {children}
                    </h1>
                  ),
                  h2: ({ children }) => (
                    <h2 className='text-2xl md:text-3xl font-bold text-gray-800 my-3'>
                      {children}
                    </h2>
                  ),
                  h3: ({ children }) => (
                    <h3 className='text-xl md:text-2xl font-bold text-gray-800 my-2'>
                      {children}
                    </h3>
                  ),
                  h4: ({ children }) => (
                    <h4 className='text-lg md:text-xl font-bold text-gray-800 my-2'>
                      {children}
                    </h4>
                  ),
                  blockquote: ({ children }) => (
                    <blockquote className='border-l-4 border-gray-400 pl-4 italic text-gray-600 my-4'>
                      {children}
                    </blockquote>
                  ),
                  table: ({ children }) => (
                    <table className='table-auto m-4 w-full border border-gray-300 text-left'>
                      {children}
                    </table>
                  ),
                  tr: ({ children }) => (
                    <tr className='border-b'>{children}</tr>
                  ),
                  td: ({ children }) => (
                    <td className='border p-2'>{children}</td>
                  ),
                }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Recent Articles Section */}
      <div className='bg-gray-50 shadow-lg rounded-lg border border-gray-200 p-4'>
        <h2 className='text-2xl font-semibold text-gray-800 mb-4'>
          Recent Articles
        </h2>
        <ul>
          {recentArticles.map((recentArticle, index) => (
            <li key={index} className='flex items-center mb-4'>
              <Image
                src={recentArticle.featuredImage.url}
                alt={recentArticle.title}
                width={100}
                height={60}
                className='rounded-md mr-3'
              />
              <div>
                <Link
                  href={`/article/${recentArticle.slug}`}
                  className='text-gray-900 hover:text-blue-600 hover:underline'
                >
                  {recentArticle.title}
                </Link>
                <span className='text-gray-500 text-xs block mt-1'>
                  {new Date(recentArticle.date).toLocaleDateString()}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Page
