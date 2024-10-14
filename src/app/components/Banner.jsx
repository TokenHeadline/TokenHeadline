'use client'
import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import move from 'lodash-move'
import { GET_BANNER } from '../../../services'
import { useQuery } from '@apollo/client'
import client from '../../lib/apolloClient'
const CARD_OFFSET = 30
const SCALE_FACTOR = 0.04
const VISIBLE_CARDS = 3
import BannerSkeleton from './Skeleton/BannerSkeleton'
import Link from 'next/link'

const Banner = () => {
  const [News, setNews] = useState([])
  const { loading, error, data } = useQuery(GET_BANNER, { client: client })

  const [cards, setCards] = useState([])
  const [hoveredIndex, setHoveredIndex] = useState(null)

  useEffect(() => {
    if (data && data.articles) {
      setNews(data.articles)
      setCards(data.articles.slice(0, 6))
    }
  }, [data])

  const moveToEnd = (from) => {
    setCards(move(cards, from, cards.length - 1))
  }

  useEffect(() => {
    const interval = setInterval(() => {
      moveToEnd(0)
    }, 3000)

    return () => clearInterval(interval)
  }, [cards])

  if (loading) return <BannerSkeleton />

  return (
    <div className='relative flex justify-center items-center'>
      <ul className='relative xl:w-[400px] xl:h-[520px] lg:h-[420px] lg:w-[250px] lg:p-10 mt-16 lg:mt-0 w-[650px] h-[300px]'>
        {cards.map((newsItem, index) => {
          const canDrag = index === 0
          const isVisible = index < VISIBLE_CARDS

          if (!isVisible) return null

          return (
            <motion.li
              key={newsItem.id}
              className={`absolute w-full h-full bg-cover bg-center ${
                canDrag ? 'cursor-grab' : 'cursor-auto'
              } ${hoveredIndex === index ? '' : 'grayscale'}`}
              style={{
                backgroundImage: `url(${newsItem.featuredImage.url})`,
              }}
              animate={{
                top: index * -CARD_OFFSET,
                scale: 1 - index * SCALE_FACTOR,
                zIndex: News.length - index,
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
              <div className='absolute bottom-2 left-2 text-white p-2 lg:rounded-md bg-black bg-opacity-50 lg:rounded-br-[50px]'>
                <Link
                  href={`/article/${newsItem.slug}`}
                  aria-label={`/article/${newsItem.slug}`}
                  className='text-lg font-semibold'
                >
                  {newsItem.title}
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
