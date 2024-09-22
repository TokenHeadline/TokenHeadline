'use client'
import React from 'react'
import { FaFacebook, FaLinkedin, FaYoutube } from 'react-icons/fa'
import Image from 'next/image'
import { FaSquareInstagram } from 'react-icons/fa6'
import { AiFillTwitterCircle } from 'react-icons/ai'
import Link from 'next/link'

const Footer = () => {
  return (
    <footer className='bg-blue-300 text-black pt-8 pb-4'>
      <div className='container mx-auto px-4 md:px-12 lg:px-20 xl:px-36 flex flex-col lg:flex-row justify-between items-center md:items-start'>
        {/* Left Side - Logo and Social Icons */}
        <div className='mb-10 md:mb-0'>
          <Link href='/'>
            <Image
              src={'/logo.png'}
              width={150}
              height={40}
              alt='logo'
              priority={true}
              className='mb-4'
            />
          </Link>
          <div className='flex space-x-4 mb-6 justify-center md:justify-start'>
            <Link
              href='#'
              aria-label='Facebook'
              className='hover:text-gray-600'
            >
              <FaFacebook size={40} />
            </Link>
            <Link
              href='#'
              aria-label='Instagram'
              className='hover:text-gray-400 rounded-full'
            >
              <FaSquareInstagram size={40} />
            </Link>
            <Link href='#' aria-label='Twitter' className='hover:text-gray-400'>
              <AiFillTwitterCircle size={40} />
            </Link>
            <Link
              href='#'
              aria-label='LinkedIn'
              className='hover:text-gray-400'
            >
              <FaLinkedin size={40} />
            </Link>
            <Link href='#' aria-label='YouTube' className='hover:text-gray-400'>
              <FaYoutube size={40} />
            </Link>
          </div>
          <p className='text-gray-500 text-center md:text-left'>
            &copy; 2024 TokenHeadline
          </p>
        </div>

        {/* Right Side - Links Columns */}
        <div className='flex flex-wrap justify-center md:justify-end space-x-12 text-lg'>
          {/* Column 1 */}
          <div className='mb-6'>
            <ul>
              <li className='mb-2'>
                <Link href='/' className='hover:text-gray-400'>
                  Home
                </Link>
              </li>
              <li className='mb-2'>
                <Link href='exclusive-article' className='hover:text-gray-400'>
                  Exclusive Article
                </Link>
              </li>
              <li className='mb-2'>
                <Link href='press-release' className='hover:text-gray-400'>
                  Press Release
                </Link>
              </li>

              <li className='mb-2'>
                <Link href='interview' className='hover:text-gray-400'>
                  Interview
                </Link>
              </li>
              <li className='mb-2'>
                <Link href='learn' className='hover:text-gray-400'>
                  Learn
                </Link>
              </li>

              <li className='mb-2'>
                <Link href='advertisement' className='hover:text-gray-400'>
                  Advertisement
                </Link>
              </li>
              <li>
                <Link href='partners' className='hover:text-gray-400'>
                  Partners
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2 */}
          <div className='mb-6'>
            <ul>
              <li className='mb-2'>
                <Link href='#' className='hover:text-gray-400'>
                  Privacy
                </Link>
              </li>
              <li className='mb-2'>
                <Link href='#' className='hover:text-gray-400'>
                  Terms
                </Link>
              </li>
              <li className='mb-2'>
                <Link href='#' className='hover:text-gray-400'>
                  Disclaimer
                </Link>
              </li>
              <li className='mb-2'>
                <Link href='#' className='hover:text-gray-400'>
                  Team
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3 */}
          <div className='mb-6'>
            <ul>
              <li className='mb-2'>
                <Link href='#' className='hover:text-gray-400'>
                  Contact
                </Link>
              </li>
              <li>
                <Link href='#' className='hover:text-gray-400'>
                  FAQs
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
