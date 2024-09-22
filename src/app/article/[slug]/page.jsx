'use client'

import React from 'react'

const Page = ({ params }) => {
  const { slug } = params
  console.log(slug)

  return <div>Article: {slug}</div>
}

export default Page
