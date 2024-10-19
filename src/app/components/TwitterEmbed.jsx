'use client'
import { useEffect } from 'react'

const TwitterEmbed = ({ tweetUrl }) => {
  useEffect(() => {
    if (window.twttr) {
      window.twttr.widgets.load()
    } else {
      const script = document.createElement('script')
      script.src = 'https://platform.twitter.com/widgets.js'
      script.async = true
      document.body.appendChild(script)
    }
  }, [])

  return (
    <blockquote className='twitter-tweet'>
      <a href={tweetUrl}></a>
    </blockquote>
  )
}

export default TwitterEmbed
