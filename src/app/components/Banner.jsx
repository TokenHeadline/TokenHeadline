'use client'
import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import move from 'lodash-move'

const CARD_OFFSET = 30
const SCALE_FACTOR = 0.04
const VISIBLE_CARDS = 3 // Limit the number of visible cards

const Banner = ({ News }) => {
  const [cards, setCards] = useState(News)

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
    <div>uhfaiubhf</div>
    // <div className='relative flex items-center justify-center'>
    //   <ul
    //     className='relative xl:w-
    //  bg-gray-300 rounded-br-[60px] '
    //   >
    //     {cards.map((newsItem, index) => {
    //       const canDrag = index === 0
    //       const isVisible = index < VISIBLE_CARDS // Only show 3 cards

    //       if (!isVisible) return null // Skip rendering other cards

    //       return (
    //         <motion.li
    //           key={newsItem.id}
    //           className={`absolute w-full h-full bg-cover bg-center grayscale rounded-br-[60px] ${
    //             canDrag ? 'cursor-grab' : 'cursor-auto'
    //           }`}
    //           style={{
    //             backgroundImage: `url(${newsItem.featuredImage})`,
    //           }}
    //           animate={{
    //             top: index * -CARD_OFFSET,
    //             scale: 1 - index * SCALE_FACTOR,
    //             zIndex: News.length - index,
    //           }}
    //           drag={canDrag ? 'y' : false}
    //           dragConstraints={{
    //             top: 0,
    //             bottom: 0,
    //           }}
    //           onDragEnd={() => moveToEnd(index)}
    //         >
    //           <div className='absolute bottom-2 left-2 text-white p-2 rounded-md bg-black'>
    //             <h3 className='text-lg font-semibold'>{newsItem.title}</h3>
    //           </div>
    //         </motion.li>
    //       )
    //     })}
    //   </ul>
    // </div>
  )
}

export default Banner
