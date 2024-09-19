'use client'
import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import move from 'lodash-move'

const CARD_OFFSET = 30
const SCALE_FACTOR = 0.04
const VISIBLE_CARDS = 3 // Limit the number of visible cards

const Banner = ({ News }) => {
  const [cards, setCards] = useState(News.slice(0, 5))

  const moveToEnd = (from) => {
    setCards(move(cards, from, cards.length - 1))
  }

  useEffect(() => {
    const interval = setInterval(() => {
      moveToEnd(0)
    }, 3000)

    return () => clearInterval(interval)
  }, [cards])

  return (
    <div className='realtive  flex justify-center items-center'>
      <ul
        className='relative xl:w-[400px] xl:h-[520px]
      lg:h-[420px] lg:w-[250px] lg:p-10 

      mt-16 lg:mt-0 w-[650px] h-[300px]'
      >
        {cards.map((newsItem, index) => {
          const canDrag = index === 0
          const isVisible = index < VISIBLE_CARDS // Only show 3 cards

          if (!isVisible) return null // Skip rendering other cards

          return (
            <motion.li
              key={newsItem.id}
              className={`absolute w-full h-full bg-cover bg-center grayscale lg:rounded-br-[60px] ${
                canDrag ? 'cursor-grab' : 'cursor-auto'
              }`}
              style={{
                backgroundImage: `url(${newsItem.featuredImage})`,
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
            >
              <div className='absolute bottom-2 left-2 text-white p-2 lg:rounded-md bg-black bg-opacity-50 lg:rounded-br-[50px]'>
                <h3 className='text-lg font-semibold'>{newsItem.title}</h3>
              </div>
            </motion.li>
          )
        })}
      </ul>
    </div>
  )
}

export default Banner
