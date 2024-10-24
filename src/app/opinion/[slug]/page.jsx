'use client'
import React, { useEffect, useState } from 'react'
import { GET_ARTICLE, GET_RECENT_ARTICLES } from '../../../../services/index'
import client from '../../../lib/apolloClient'
import { RichText } from '@graphcms/rich-text-react-renderer'
import Image from 'next/image'
import Link from 'next/link'
import Cryptowidget from '../../components/Cryptowidget'
import TwitterEmbed from '../../components/TwitterEmbed'
import Head from 'next/head'

const Page = ({ params }) => {
  const { slug } = params

  const [article, setArticle] = useState(null)
  const [recentArticles, setRecentArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true) // Set loading state at the start
      try {
        const { data } = await client.query({
          query: GET_ARTICLE,
          variables: { slug },
        })
        setArticle(data.articles[0])

        const { data: recentData } = await client.query({
          query: GET_RECENT_ARTICLES,
          variables: { slug },
        })
        setRecentArticles(recentData.articles)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [slug])

  if (loading) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <p className='text-xl font-semibold'>Loading...</p>
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

  if (!article) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <p className='text-xl font-semibold text-red-500'>Article not found</p>
      </div>
    )
  }

  return (
    <div className='container mx-auto px-4 lg:px-0 pt-0 pb-4 max-w-6xl'>
      <Head>
        <title>{article.seoTitle}</title>
        <meta name='description' content={article.metaDescription} />
        <meta property='og:title' content={article.title} />
        <meta property='og:description' content={article.description} />
        <meta property='og:image' content={article.featuredImage.url} />
      </Head>
      <head>
        <title>{article.title}</title>
      </head>
      <div className='mx-auto p-6'>
        <div className='mb-10'>
          <div className='items-center text-center'>
            <h1 className='text-4xl sm:text-5xl font-extrabold text-gray-900 mb-6'>
              {article.title}
            </h1>
            <Image
              src={article.featuredImage.url}
              alt={article.title}
              width={800}
              height={450}
              className='rounded-lg mb-6 mx-auto'
            />
            <div className='flex justify-center text-gray-700 text-sm mb-4 flex-wrap'>
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
                img: ({ src, altText }) => (
                  <Image
                    src={src}
                    alt={altText}
                    width={800}
                    height={500}
                    className='rounded-lg my-5 mx-auto'
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
                tr: ({ children }) => <tr className='border-b'>{children}</tr>,
                td: ({ children }) => (
                  <td className='border p-2'>{children}</td>
                ),
              }}
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
            {recentArticles.map((recentArticle, index) => (
              <li key={index} className='flex items-center mb-4'>
                <Image
                  src={recentArticle.featuredImage.url}
                  alt={recentArticle.title}
                  width={100}
                  height={60}
                  className='rounded-md mr-4'
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
        <div className='flex-none md:w-1/3'>
          <Cryptowidget />
        </div>
      </div>
    </div>
  )
}

export default Page
