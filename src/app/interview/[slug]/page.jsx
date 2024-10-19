'use client'
import React, { useEffect, useState } from 'react'
import { GET_INTERVIEW, GET_RECENT_ARTICLES } from '../../../../services/index'
import client from '../../../lib/apolloClient'
import { RichText } from '@graphcms/rich-text-react-renderer'
import Image from 'next/image'
import Link from 'next/link'
import Cryptowidget from '../../components/Cryptowidget'
import TwitterEmbed from '../../components/TwitterEmbed'

const Page = ({ params }) => {
  const { slug } = params
  const [articles, setArticles] = useState([])
  const [recentArticles, setRecentArticles] = useState([])
  const [meta, setMeta] = useState({ title: '', description: '' })
  const [loading, setLoading] = useState(true) // Adding loading state
  const [error, setError] = useState(null) // Adding error state

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await client.query({
          query: GET_INTERVIEW,
          variables: { slug },
        })

        const fetchedArticles = data.pressResleases

        if (fetchedArticles.length > 0) {
          setArticles(fetchedArticles)
          const article = fetchedArticles[0]

          // Set meta tags for SEO
          setMeta({
            title: article.seoTitle || article.title,
            description:
              article.seoDescription ||
              'Default description if none is provided',
          })
        }

        // Fetch recent articles
        const { data: recentData } = await client.query({
          query: GET_RECENT_ARTICLES,
          variables: { slug },
        })
        setRecentArticles(recentData.articles)
      } catch (err) {
        setError(err.message) // Handle errors
      } finally {
        setLoading(false) // Set loading to false after fetch
      }
    }

    fetchData()
  }, [slug])

  if (loading) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <p className='text-xl font-semibold text-green-500'>Loading</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <p className='text-xl font-semibold text-red-500'>Error: {error}</p>
      </div>
    )
  }

  return (
    <div className='container mx-auto px-4 lg:px-0 pt-0 pb-4 max-w-6xl'>
      <head>
        <title>{meta.title || 'Default'}</title>
        <meta name='description' content={meta.description} />
      </head>
      <div className='mx-auto p-6'>
        {articles.map((article) => (
          <div key={article.id} className='mb-10'>
            <div className='items-center text-center'>
              <h1 className='text-5xl font-extrabold text-gray-900 mb-6'>
                {article.title}
              </h1>
              <Image
                src={article.featuredImage.url}
                alt={article.title}
                width={800}
                height={450}
                className='rounded-lg mb-6 mx-auto'
              />
              <div className='flex justify-center text-gray-700 text-sm mb-4'>
                <span className='mr-4'>By {article.author.name}</span>
                <span>{new Date(article.date).toLocaleDateString()}</span>
              </div>
            </div>
            <div className='prose lg:prose-lg text-gray-800'>
              <RichText
                content={article.content.raw}
                renderers={{
                  bold: ({ children }) => (
                    <strong className='font-bold'>{children}</strong>
                  ),
                  underline: ({ children }) => (
                    <span className='underline'>{children}</span>
                  ),
                  italic: ({ children }) => (
                    <em className='italic'>{children}</em>
                  ),
                  img: ({ src, altText }) =>
                    src ? (
                      <Image
                        src={src}
                        alt={altText}
                        width={800}
                        height={500}
                        className='rounded-lg my-5'
                      />
                    ) : null,
                  ul: ({ children }) => (
                    <ul className='list-disc pl-6 my-4'>{children}</ul>
                  ),
                  ol: ({ children }) => (
                    <ol className='list-decimal pl-6 my-4'>{children}</ol>
                  ),
                  li: ({ children }) => <li className='mb-2'>{children}</li>,
                  h1: ({ children }) => (
                    <h1 className='text-3xl font-bold text-gray-800 my-4'>
                      {children}
                    </h1>
                  ),
                  h2: ({ children }) => (
                    <h2 className='text-2xl font-bold text-gray-800 my-3'>
                      {children}
                    </h2>
                  ),
                  h3: ({ children }) => (
                    <h3 className='text-xl font-bold text-gray-800 my-2'>
                      {children}
                    </h3>
                  ),
                  blockquote: ({ children }) => {
                    const twitterUrl =
                      children.props?.children?.[0]?.props?.children
                    if (twitterUrl && twitterUrl.includes('twitter.com')) {
                      return <TwitterEmbed tweetUrl={twitterUrl} />
                    }
                    return (
                      <blockquote className='border-l-4 border-gray-400 pl-4 italic text-gray-600 my-4'>
                        {children}
                      </blockquote>
                    )
                  },
                  table: ({ children }) => (
                    <table className='table-auto m-4 w-full border border-gray-300'>
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
      <div className='container mx-auto px-4 lg:px-0 pt-0 pb-4 max-w-6xl flex flex-col md:flex-row'>
        <div className='max-w-full md:max-w-2xl mx-5 bg-gray-50 shadow-lg rounded-lg border border-gray-200 p-6 flex-1 mb-4 md:mb-0'>
          <h2 className='text-2xl font-bold mb-4'>Recent Articles</h2>
          {recentArticles.length > 0 ? (
            recentArticles.map((recentArticle) => (
              <div key={recentArticle.id} className='mb-4'>
                <h3 className='text-xl font-semibold'>
                  <Link href={`/articles/${recentArticle.slug}`}>
                    {recentArticle.title}
                  </Link>
                </h3>
                <p className='text-gray-500'>{recentArticle.excerpt}</p>
              </div>
            ))
          ) : (
            <p>No recent articles available.</p>
          )}
        </div>
        <Cryptowidget />
      </div>
    </div>
  )
}

export default Page
