'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { FiMenu, FiX } from 'react-icons/fi'
import { RiHome2Fill } from 'react-icons/ri'
import { motion } from 'framer-motion'
import Image from 'next/image'
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const handleOutsideClick = (e: any) => {
    if (e.target.classList.contains('modal-overlay')) {
      setIsOpen(false)
    }
  }

  const menuItems = [
    { name: 'Press Release', href: '/press-release' },
    { name: 'Opinions', href: '/opinion' },
    { name: 'Articles', href: '/articles' },
    { name: 'Interview', href: '/interview' },
    { name: 'Learn', href: '/learn' },
    { name: 'Advertisement', href: '/advertisement' },
    { name: 'Partners', href: '/partners' },
  ]

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick)
    } else {
      document.removeEventListener('mousedown', handleOutsideClick)
    }
    return () => document.removeEventListener('mousedown', handleOutsideClick)
  }, [isOpen])

  return (
    <nav className='text-black font-semibold lg:mb-6 m-8 mt-5 mb-1'>
      <div className='container flex flex-row justify-between'>
        <div className='hidden lg:flex items-center text-base mx-2 xl:mx-6 '>
          <Link href='/' passHref>
            <RiHome2Fill
              size={24}
              className='transition-transform duration-300 ease-in-out cursor-pointer'
              style={{ color: '#002993' }}
              aria-label='Home'
            />
          </Link>
          <div className='border-l border-black border-2 h-12 mx-4'></div>
          <div className='space-x-4 xl:space-x-6 ml-0'>
            {menuItems.slice(0, 5).map((item, index) => (
              <div className='relative inline-block' key={index}>
                <Link
                  href={item.href}
                  className='relative transition-colors duration-300 ease-in-out hover:text-blue-600'
                  aria-label={item.name}
                >
                  {item.name}
                </Link>
              </div>
            ))}
          </div>
          <div className='ml-12 xl:ml-16 space-x-6'>
            {menuItems.slice(5).map((item, index) => (
              <div className='relative inline-block' key={index}>
                <Link
                  href={item.href}
                  className='relative transition-colors duration-300 ease-in-out hover:text-blue-600'
                  aria-label={item.name}
                >
                  {item.name}
                </Link>
              </div>
            ))}
          </div>
        </div>
        <div className='flex items-center justify-center lg:mx-auto '>
          <Link
            href='/'
            passHref
            className='text-3xl font-bold text-center mt-2 lg:pl-3 '
          >
            <Image
              src={'/logo.png'}
              height={50}
              width={155}
              alt='logo
              
          '
              priority={true}
            />
          </Link>
        </div>
        <div className='lg:hidden flex flex-col items-end mt-6'>
          <button
            onClick={toggleMenu}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            className='focus:outline-none'
          >
            {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
          {isOpen && (
            <div className='modal-overlay fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
              <div className='bg-white p-6 rounded-lg shadow-lg w-3/4 max-w-md relative'>
                <button
                  onClick={toggleMenu}
                  aria-label='Close menu'
                  className='absolute top-2 right-2'
                ></button>
                <div className='flex flex-col space-y-4'>
                  {menuItems.slice(0, 4).map((item, index) => (
                    <Link
                      href={item.href}
                      key={index}
                      className='relative transition-colors duration-300 ease-in-out hover:text-blue-600'
                      aria-label={item.name}
                    >
                      {item.name}
                    </Link>
                  ))}
                  <div className='flex flex-col space-y-4'>
                    {menuItems.slice(4).map((item, index) => (
                      <Link
                        href={item.href}
                        key={index}
                        className='relative transition-colors duration-300 ease-in-out hover:text-blue-600'
                        aria-label={item.name}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}
