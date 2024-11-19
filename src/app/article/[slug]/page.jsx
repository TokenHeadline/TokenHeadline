import React from 'react'
import ArticleContent from './ArticleContent'
const Page = ({ params }) => {
  const { slug } = params

  return (
    <div className='container pt-0 pb-4 max-w-6xl'>
      <ArticleContent slug={slug} />
    </div>
  )
}

export default Page
