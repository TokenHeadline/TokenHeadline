'use client'
import React from 'react'
import { FaFacebook, FaLinkedin, FaYoutube } from 'react-icons/fa'
import Image from 'next/image'
import { FaSquareInstagram } from 'react-icons/fa6'
import { AiFillTwitterCircle } from 'react-icons/ai'
import Link from 'next/link'

const Footer = () => {
  return (
    <div className='bg-stone-950 text-white pt-8 pb-4 mt-8 '>
      <div className='container mx-auto px-4 md:px-12 lg:px-20 xl:px-36 flex flex-col lg:flex-row justify-between items-center md:items-start'>
        <div className='mb-10 md:mb-0'>
          {/* <Image
            src={'/logowhite.png'}
            width={150}
            height={40}
            alt='logo'
            priority={true}
            className='mb-4'
          /> */}

          <p className='text-white text-center md:text-left'>
            Copyright &copy; 2024 TokenHeadline
          </p>
        </div>

        <div className='flex flex-wrap justify-center md:justify-end space-x-12 text-lg'>
          <div className='mb-6'>
            <ul>
              <li className='mb-2'>
                <Link href='/' className='hover:text-gray-400'>
                  Home
                </Link>
              </li>

              <li className='mb-2'>
                <Link href='articles' className='hover:text-gray-400'>
                  Articles
                </Link>
              </li>
              <li className='mb-2'>
                <Link href='press-release' className='hover:text-gray-400'>
                  Press Release
                </Link>
              </li>

              <li className='mb-2'>
                <Link href='learn' className='hover:text-gray-400'>
                  Learn
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3 */}
          <div className='mb-6'>
            <ul>
              <li className='mb-2'>
                <div className='flex space-x-4 mb-6 justify-center md:justify-start'>
                  <Link
                    href='#'
                    aria-label='Facebook'
                    className='hover:text-gray-600'
                  >
                    <FaFacebook size={40} />
                  </Link>
                  <Link
                    href='https://www.instagram.com/tokenheadline/'
                    aria-label='Instagram'
                    className='hover:text-gray-400 rounded-full'
                    target='_blank'
                  >
                    <FaSquareInstagram size={40} />
                  </Link>
                  <Link
                    href='https://x.com/TokenHeadline/'
                    target='_blank'
                    aria-label='Twitter'
                    className='hover:text-gray-400'
                  >
                    <AiFillTwitterCircle size={40} />
                  </Link>

                  <Link
                    href='#'
                    aria-label='YouTube'
                    className='hover:text-gray-400'
                  >
                    <FaYoutube size={40} />
                  </Link>
                </div>
              </li>
              <li className='mb-2'>
                <Link href='#' className='hover:text-gray-400'>
                  Contact
                </Link>
              </li>
              <li>
                <Link href='#' className='hover:text-gray-400'>
                  Disclaimer
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer
