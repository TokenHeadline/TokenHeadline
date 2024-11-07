'use client'
import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import { GET_OPINION, GET_RECENT_ARTICLES } from '../../../../services/index'
import client from '../../../lib/apolloClient'
import DOMPurify from 'dompurify'
import Image from 'next/image'
import Link from 'next/link'
import Cryptowidget from '../../components/Cryptowidget'

const Page = ({ params }) => {
  const { slug } = params

  const [article, setArticle] = useState(null)
  const [recentArticles, setRecentArticles] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch the current article
        const { data } = await client.query({
          query: GET_OPINION,
          variables: { slug },
        })
        setArticle(data.opinion)

        // Fetch recent articles
        const { data: recentData } = await client.query({
          query: GET_RECENT_ARTICLES,
        })

        // Filter out the current article

        setRecentArticles(recentData.posts.nodes)
      } catch (error) {
        console.error('Error fetching articles:', error)
      } finally {
        setLoading(false)
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

  if (!article) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <p className='text-xl font-semibold text-red-500'>Article not found</p>
      </div>
    )
  }

  const title = article.title

  return (
    <div className='container mx-auto px-4 lg:px-0 pt-0 pb-4 max-w-6xl'>
      <head>
        <title>{article.title || 'Untitled Article'}</title>
        <meta
          name='description'
          content={article.excerpt || 'No description available'}
        />
      </head>
      <div className='mx-auto p-6'>
        <div className='mb-10'>
          <div className='items-center text-center'>
            <h1 className='text-4xl sm:text-5xl font-extrabold text-gray-900 mb-6'>
              {article.title}
            </h1>
            <Image
              src={article.featuredImage.node.sourceUrl}
              alt={article.title}
              width={800}
              height={450}
              className='rounded-lg mb-6 mx-auto'
            />
            <div className='flex justify-center text-gray-700 text-sm mb-4 flex-wrap'>
              <span className='mr-4'>By {article.author.node.name}</span>
              <span>{new Date(article.date).toLocaleDateString()}</span>
            </div>
          </div>
          <div className='prose lg:prose-lg text-gray-800 mx-auto'>
            <div
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(article.content),
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
                  src={recentArticle.featuredImage.node.sourceUrl}
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
