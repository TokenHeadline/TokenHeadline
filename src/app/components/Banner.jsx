'use client'
import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import move from 'lodash-move'
import { GET_BANNER } from '../../../services'
import { useQuery } from '@apollo/client'
import client from '../../lib/apolloClient'
import BannerSkeleton from './Skeleton/BannerSkeleton'
import Link from 'next/link'

const CARD_OFFSET = 30
const SCALE_FACTOR = 0.04
const VISIBLE_CARDS = 3

const Banner = () => {
  const [cards, setCards] = useState([])
  const [hoveredIndex, setHoveredIndex] = useState(null)

  // Use the GET_BANNER query to fetch posts data
  const { loading, error, data } = useQuery(GET_BANNER, { client: client })

  useEffect(() => {
    if (data?.posts?.nodes) {
      setCards(data.posts.nodes.slice(0, 6)) // Get the first 6 posts, or an empty array if posts are undefined
    } else {
      setCards([]) // Fallback to an empty array if data is missing
    }
  }, [data])

  const moveToEnd = (from) => {
    setCards((prevCards) => move(prevCards, from, prevCards.length - 1))
  }

  useEffect(() => {
    const interval = setInterval(() => {
      if (cards.length > 0) {
        moveToEnd(0)
      }
    }, 3000)

    return () => clearInterval(interval)
  }, [cards])

  if (loading) return <BannerSkeleton />
  if (error) return <p>Error loading banner</p>

  return (
    <div className='relative flex justify-center items-center md:pt-2'>
      <ul className='relative xl:w-[400px] xl:h-[520px] lg:h-[520px] lg:w-[250px] lg:p-10 mt-16 lg:mt-0 w-[650px] h-[300px]'>
        {cards.map((newsItem, index) => {
          const canDrag = index === 0
          const isVisible = index < VISIBLE_CARDS

          if (!isVisible) return null

          // Fallback for missing values
          const backgroundImageUrl =
            newsItem?.featuredImage?.node?.sourceUrl || '/logo.png'
          const title = newsItem?.title || 'Untitled'
          const slug = newsItem?.slug || '#'
          const id = newsItem?.id || `card-${index}` // Fallback to a generated ID if id is missing

          return (
            <motion.li
              key={id}
              className={`absolute w-full h-full lg:rounded-br-[50px] ${
                canDrag ? 'cursor-grab' : 'cursor-auto'
              } ${hoveredIndex === index ? '' : 'grayscale'}`}
              animate={{
                top: index * -CARD_OFFSET,
                scale: 1 - index * SCALE_FACTOR,
                zIndex: cards.length - index,
              }}
              drag={canDrag ? 'y' : false}
              dragConstraints={{
                top: 0,
                bottom: 0,
              }}
              onDragEnd={() => moveToEnd(index)}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className='absolute top-0 left-0 w-full h-full'>
                <img
                  src={backgroundImageUrl}
                  alt={title || 'Image'}
                  className='w-full h-full object-cover lg:rounded-br-[50px]'
                />
              </div>

              <div className='absolute bottom-2 left-2 text-white p-2 mb-0 pb-0 lg:rounded-md bg-black bg-opacity-50 lg:rounded-br-[50px]'>
                <Link
                  href={`/article/${slug}`}
                  aria-label={`/article/${slug}`}
                  className='text-lg font-semibold'
                >
                  {title}
                </Link>
              </div>
            </motion.li>
          )
        })}
      </ul>
    </div>
  )
}

export default Banner
