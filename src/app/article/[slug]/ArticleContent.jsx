'use client'

import React, { useEffect, useState } from 'react'
import DOMPurify from 'dompurify'
import { GET_ARTICLE, GET_RECENT_ARTICLES } from '../../../../services/index'
import client from '../../../lib/apolloClient'
import Link from 'next/link'
import Cryptowidget from '../../components/Cryptowidget'

const ArticleContent = ({ slug }) => {
  const [article, setArticle] = useState(null)
  const [recentArticles, setRecentArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: articleData } = await client.query({
          query: GET_ARTICLE,
          variables: { slug },
        })

        const { data: recentData } = await client.query({
          query: GET_RECENT_ARTICLES,
        })

        const filteredArticles = recentData.posts.nodes.filter(
          (recentArticle) => recentArticle.slug !== slug
        )

        setArticle(articleData.post)
        setRecentArticles(filteredArticles)
      } catch (err) {
        console.error('Error fetching data:', err)
        setError('Failed to load content. Please try again later.')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [slug])

  if (loading) {
    return (
      <div className='container mx-auto px-4 lg:px-0 pt-0 pb-4 max-w-6xl h-screen text-center text-green'>
        <p className='text-lg font-semibold'>Loading...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className='container mx-auto px-4 lg:px-0 pt-0 pb-4 max-w-6xl'>
        <p className='text-red-500 text-center'>{error}</p>
      </div>
    )
  }

  if (!article) {
    return (
      <div className='container mx-auto px-4 lg:px-0 pt-0 pb-4 max-w-6xl'>
        <p className='text-gray-700 text-center'>Article not found</p>
      </div>
    )
  }

  // Replace WordPress links in article content
  const replaceWordPressLinks = (content) => {
    return content.replace(
      /https?:\/\/cms\.tokenheadline\.com(\/(opinion|press-release|interview|article|[^"\s]+))/g,
      (_, path) => {
        // Skip paths that belong to image files
        if (/\.(jpg|jpeg|png|gif|svg|webp)$/i.test(path)) {
          return `https://cms.tokenheadline.com${path}` // Keep original for images
        }

        // Handle article or specific categories
        return path.startsWith('/opinion') ||
          path.startsWith('/press-release') ||
          path.startsWith('/interview')
          ? `https://tokenheadline.com${path}`
          : `https://tokenheadline.com/article${path}`
      }
    )
  }
  const sanitizedContent = DOMPurify.sanitize(
    replaceWordPressLinks(article.content)
  )

  return (
    <div className='container pt-0 pb-4 max-w-6xl mx-auto'>
      <div className='p-4 md:p-6'>
        <div className='mb-10'>
          <div className='md:text-center'>
            <h1 className='text-xl md:text-4xl font-extrabold text-gray-900 mb-6'>
              {article.title || 'No Title'}
            </h1>
            <img
              src={
                article.featuredImage?.node?.sourceUrl || '/default-logo.png'
              }
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
          <div
            className='prose lg:prose-lg text-gray-800 mx-auto'
            dangerouslySetInnerHTML={{ __html: sanitizedContent }}
          />
        </div>
      </div>

      <div className='container mx-auto px-4 lg:px-0 pt-0 pb-4 flex flex-col md:flex-row'>
        <div className='max-w-full md:max-w-4xl md:mx-1 md:bg-gray-50 bg-opacity-80 shadow-lg rounded-lg border border-gray-200 p-6 flex-1 mb-4 md:mb-0'>
          <h2 className='text-3xl font-semibold text-gray-800 mb-6'>
            Recent Articles
          </h2>
          <ul>
            {recentArticles.map((recentArticle, index) => (
              <li key={index} className='flex items-center mb-4'>
                <img
                  src={
                    recentArticle.featuredImage?.node?.sourceUrl ||
                    '/default-logo.png'
                  }
                  alt={recentArticle.title || 'No Title'}
                  width='100'
                  height='60'
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
}

export default ArticleContent
