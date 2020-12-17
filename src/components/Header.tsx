import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

const Header = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 flex justify-between items-center border-b-2 border-gray-100 py-6 md:justify-start md:space-x-10 relative bg-white">
      <div className="lg:w-0 lg:flex-1">
        <Link href="/">
          <a className="flex">
            <Image className="h-10 w-auto sm:h-12" src="/images/logo.svg" alt="Workflow" width={60} height={60} />
          </a>
        </Link>
      </div>
      <div className="-mr-2 -my-2 md:hidden">
        <button
          type="button"
          className="inline-flex items-center flex justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
        >
          <svg
            className="h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
      <nav className="hidden md:flex space-x-10">
        <Link href="/">
          <a className="flex">
            <Image className="h-10 w-auto sm:h-12" src="/images/agileo.svg" alt="Workflow" width={120} height={60} />
          </a>
        </Link>
      </nav>
      <div className="hidden md:flex items-center justify-end space-x-8 md:flex-1 lg:w-0">
        <span className="inline-flex rounded-md shadow-sm">
          <Link href="/login">
            <a className="whitespace-no-wrap inline-flex items-center justify-center px-4 py-2 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-yellow-500 hover:bg-yellow-300 focus:outline-none focus:border-yellow-500 focus:shadow-outline-yellow active:bg-yellow-500 transition ease-in-out duration-150">
              Login
            </a>
          </Link>
        </span>
      </div>
    </div>
  )
}

export default Header
