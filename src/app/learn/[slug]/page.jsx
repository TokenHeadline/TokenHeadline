import React from 'react'
import ArticleContent from './ArticleContent'

const Page = ({ params }) => {
  const { slug } = params

  return (
<<<<<<< HEAD
    <div className='container pt-0 pb-4 max-w-6xl px-1'>
=======
    <div className='container mx-auto px-4 lg:px-0 pt-0 pb-4 max-w-6xl'>
>>>>>>> parent of 772c6d5 (Padding all)
      <ArticleContent slug={slug} />
    </div>
  )
}

export default Page
