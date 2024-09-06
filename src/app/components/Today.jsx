import React from 'react'
import Image from 'next/image'

const Today = ({ News }) => {
  return (
    <div className='flex flex-col basis-1/3 lg:p-3 lg:pt-0'>
      {News.slice(0, 1).map((article, index) => (
        <div key={index}>
          <h1 className='text-6xl font-bold lg:text-center'>TODAY RELEASE</h1>
          <h2 className='text-2xl pt-1 font-bold'>{article.subheading}</h2>
          <div className='flex flex-row space-x-8 text-sm'>
            <p className='pt-2 font-bold'>{article.category}</p>
            <p className='pt-2 text-gray-500'>By {article.author.name}</p>
            <p className='pt-2 text-gray-500'>{article.date}</p>
          </div>

          <p className='text-lg pt-2'>{article.content}</p>

          <div className='pt-4'>
            <Image
              src='https://img.freepik.com/free-vector/cryptocurrency-bitcoin-golden-coin-background_1017-31505.jpg?t=st=1725602614~exp=1725606214~hmac=13ec76f72876eacafbd518f7eb20fd3f552dc2b52326884fce8c66a93a8e2888&w=996'
              alt={article.title}
              width={500} // Replace with the actual width of your image
              height={400} // Replace with the actual height of your image
              // Makes the image responsive
            />
          </div>
        </div>
      ))}
    </div>
  )
}

export default Today
