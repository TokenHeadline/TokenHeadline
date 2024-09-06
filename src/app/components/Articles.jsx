import React from 'react'

const Articles = ({ News }) => {
  return (
    <div className='container basis-1/3 lg:pl-10 '>
      {News.slice(1, 5).map((article) => (
        <div key={article.id} className='container mb-8'>
          <h2
            className='text-xl font-bold
          '
          >
            {article.subheading}
          </h2>

          <div className='flex flex-row justify-between mx-4 mt-2'>
            <p className='font-semibold'>{article.category}</p>
            <p className='text-gray-500'>{article.author.name}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Articles
