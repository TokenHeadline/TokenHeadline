'use client'
import React, { useState, useEffect } from 'react'
import { GET_ARTICLE } from '../../../../services/index'
import { useQuery } from '@apollo/client'
import client from '../../../lib/apolloClient'
import { RichText } from '@graphcms/rich-text-react-renderer'
import Image from 'next/image'
const Page = ({ params }) => {
  const { slug } = params
  const { loading, error, data } = useQuery(GET_ARTICLE, {
    variables: { slug },
    client: client,
  })
  const [News, setNews] = useState([])

  useEffect(() => {
    if (data && data.articles) {
      setNews(data.articles)
    }
  }, [data])

  if (loading) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <p className='text-xl font-semibold text-gray-500'>Loading...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <p className='text-xl font-semibold text-red-500'>
          Error fetching data
        </p>
      </div>
    )
  }

  return (
    <div className='p-5 sm:p-2 md:p-4 lg:p-8 lg:pt-0  mx-auto'>
      {News.map((article, index) => (
        <div key={index} className=' p-6 mb-8 md:mb-12'>
          <h1 className='text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-4'>
            {article.title}
          </h1>

          <div className='flex flex-col sm:flex-row text-gray-600 text-sm md:text-base mb-6'>
            <span className='mb-1 sm:mb-0'>By {article.author.name}</span>
            <span className='hidden sm:block mx-2'>|</span>
            <span>{new Date(article.date).toLocaleDateString()}</span>
          </div>

          <div className='prose prose-lg max-w-none text-gray-900'>
            <RichText
              content={article.content.raw}
              renderers={{
                img: ({ src, altText }) => (
                  <Image
                    src={src}
                    alt={altText}
                    width={800}
                    height={500}
                    className='mx-auto rounded-md my-5 '
                  />
                ),
                ul: ({ children }) => (
                  <ul className='list-disc pl-5 lg:pl-10 mb-4'>{children}</ul>
                ),
                ol: ({ children }) => (
                  <ol className='list-decimal pl-5 lg:pl-10 mb-4'>
                    {children}
                  </ol>
                ),
                li: ({ children }) => <li className='mb-2'>{children}</li>,
              }}
            />
          </div>
        </div>
      ))}
    </div>
  )
}

export default Page
