import React from 'react'
import { GET_ARTICLE } from '../../../../services/index'
import client from '../../../lib/apolloClient'
import { RichText } from '@graphcms/rich-text-react-renderer'
import Image from 'next/image'

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

  const { data } = await client.query({
    query: GET_ARTICLE,
    variables: { slug },
  })

  const articles = data.articles

  console.log(articles)

  if (!articles || articles.length === 0) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <p className='text-xl font-semibold text-red-500'>Article not found</p>
      </div>
    )
  }

  return (
    <div className='p-5 sm:m-2 md:m-4 lg:m-8 lg:mt-0 mx-auto bg-gray-100 shadow-lg border-2 border-black '>
      {articles.map((article, index) => (
        <div key={index} className='p-6 mb-8 md:mb-12'>
          <h1 className='text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-4 text-center'>
            {article.title}
          </h1>

          <div className='flex flex-col sm:flex-row text-gray-600 text-sm md:text-base mb-6 '>
            <span className='mb-1 sm:mb-0 text-center'>
              By {article.author.name}
            </span>
            <span className='hidden sm:block mx-2 text-center'>|</span>
            <span className='text-center'>
              {new Date(article.date).toLocaleDateString()}
            </span>
          </div>

          <div className='prose prose-lg max-w-none text-gray-900'>
            <RichText
              content={article.content.raw}
              renderers={{
                bold: ({ children }) => <strong>{children}</strong>,
                underline: ({ children }) => (
                  <span style={{ textDecoration: 'underline' }}>
                    {children}
                  </span>
                ),
                italic: ({ children }) => <em>{children}</em>,
                img: ({ src, altText }) => (
                  <Image
                    src={src}
                    alt={article.title}
                    width={800}
                    height={500}
                    className='mx-auto rounded-md my-5'
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
                h1: ({ children }) => (
                  <h1 className='text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-6'>
                    {children}
                  </h1>
                ),
                h2: ({ children }) => (
                  <h2 className='text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-5'>
                    {children}
                  </h2>
                ),
                h3: ({ children }) => (
                  <h3 className='text-xl md:text-2xl lg:text-3xl font-bold text-gray-800 mb-4'>
                    {children}
                  </h3>
                ),
                h4: ({ children }) => (
                  <h4 className='text-lg md:text-xl lg:text-2xl font-bold text-gray-800 mb-4'>
                    {children}
                  </h4>
                ),
                h5: ({ children }) => (
                  <h5 className='text-base md:text-lg lg:text-xl font-semibold text-gray-800 mb-3'>
                    {children}
                  </h5>
                ),
                h6: ({ children }) => (
                  <h6 className='text-base md:text-lg lg:text-xl font-medium text-gray-800 mb-2'>
                    {children}
                  </h6>
                ),
                table: ({ children }) => (
                  <table className='table-auto  m-4 w-full border-2 text-center'>
                    {children}
                  </table>
                ),
                tr: ({ children }) => (
                  <tr className='text-sm p-3 '>{children}</tr>
                ),
              }}
            />
          </div>
        </div>
      ))}
    </div>
  )
}

export default Page
