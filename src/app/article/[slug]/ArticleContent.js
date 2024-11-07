'use client'

import React, { useEffect, useState } from 'react'
import DOMPurify from 'dompurify'

const ArticleContent = ({ content }) => {
  const [sanitizedContent, setSanitizedContent] = useState('')

  useEffect(() => {
    if (content) {
      setSanitizedContent(DOMPurify.sanitize(content))
    }
  }, [content])

  return (
    <div
      dangerouslySetInnerHTML={{
        __html: sanitizedContent || '<p>No content available</p>',
      }}
    />
  )
}

export default ArticleContent
