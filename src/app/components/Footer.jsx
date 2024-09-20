'use client'
import React from 'react'
import { FaFacebook, FaLinkedin, FaYoutube } from 'react-icons/fa'
import Image from 'next/image'
import { FaSquareInstagram } from 'react-icons/fa6'
import { AiFillTwitterCircle } from 'react-icons/ai'
import Link from 'next/link'
const Footer = () => {
  return (
    <footer className='bg-blue-300 text-black pt-10'>
      <div className='container mx-auto flex flex-col md:flex-row justify-between md:px-36'>
        <div className='mb-10 md:mb-0 items-center'>
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
          <div className='flex space-x-4 mb-6'>
            <a href='#' aria-label='Facebook' className='hover:text-gray-600'>
              <FaFacebook size={44} />
            </a>
            <a
              href='#'
              aria-label='Instagram'
              className='hover:text-gray-400 rounded-full'
            >
              <FaSquareInstagram size={44} />
            </a>
            <a href='#' aria-label='Twitter' className='hover:text-gray-400'>
              <AiFillTwitterCircle size={44} />
            </a>
            <a href='#' aria-label='LinkedIn' className='hover:text-gray-400'>
              <FaLinkedin size={44} />
            </a>
            <a href='#' aria-label='YouTube' className='hover:text-gray-400'>
              <FaYoutube size={44} />
            </a>
          </div>
          <p className='text-gray-500 font-thin'>
            Copyright &copy; 2024 TokenHeadline
          </p>
        </div>

        {/* Right Side - Links Columns */}
        <div className='flex flex-wrap md:space-x-16 text-xl'>
          <div className='mb-6'>
            <ul className='text-xl'>
              <li className='mb-2'>
                <a href='#' className='hover:text-gray-400'>
                  Home
                </a>
              </li>
              <li className='mb-2'>
                <a href='#' className='hover:text-gray-400'>
                  News
                </a>
              </li>
              <li className='mb-2'>
                <a href='#' className='hover:text-gray-400'>
                  Press Release
                </a>
              </li>
              <li className='mb-2'>
                <a href='#' className='hover:text-gray-400'>
                  Articles
                </a>
              </li>
              <li className='mb-2'>
                <a href='#' className='hover:text-gray-400'>
                  Interview
                </a>
              </li>
              <li className='mb-2'>
                <a href='#' className='hover:text-gray-400'>
                  Courses
                </a>
              </li>
              <li className='mb-2'>
                <a href='#' className='hover:text-gray-400'>
                  Learn
                </a>
              </li>
              <li className='mb-2'>
                <a href='#' className='hover:text-gray-400'>
                  Advertisement
                </a>
              </li>
              <li className=''>
                <a href='#' className='hover:text-gray-400'>
                  Partners
                </a>
              </li>
            </ul>
          </div>
          <div className='mb-6'>
            <ul>
              <li className='mb-2'>
                <a href='#' className='hover:text-gray-400'>
                  Privacy
                </a>
              </li>
              <li className='mb-2'>
                <a href='#' className='hover:text-gray-400'>
                  Terms
                </a>
              </li>
              <li className='mb-2'>
                <a href='#' className='hover:text-gray-400'>
                  Disclaimer
                </a>
              </li>
              <li className='mb-2'>
                <a href='#' className='hover:text-gray-400'>
                  Team
                </a>
              </li>
            </ul>
          </div>
          <div className='mb-6'>
            <ul>
              <li className='mb-2'>
                <a href='#' className='hover:text-gray-400'>
                  Contact
                </a>
              </li>
              <li className=''>
                <a href='#' className='hover:text-gray-400'>
                  FAQs
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
