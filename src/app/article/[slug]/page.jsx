// app/articles/[slug]/page.js

import ArticleContent from './ArticleContent'

export default async function Page({ params }) {
  const { slug } = params

  return (
    <div className='container pt-0 pb-4 max-w-6xl mx-auto px-2'>
      <ArticleContent slug={slug} />
    </div>
  )
}
