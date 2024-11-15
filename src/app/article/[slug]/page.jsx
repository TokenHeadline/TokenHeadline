import React from 'react'
import ArticleContent from './ArticleContent'
const Page = ({ params }) => {
  const { slug } = params

  return (
    <div className='container mx-auto px-4 lg:px-0 pt-0 pb-4 max-w-6xl'>
      <ArticleContent slug={slug} />
      <head>
        <title>Tokenheadline</title>
      </head>
    </div>
  )
}

export default Page
