import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

const Header = () => {
  return (
    <div className="flex justify-between bg-blue-450 h-16">
      <div className="mr-8">
        <Image src="/images/logo.svg" alt="Logo" width={50} height={50} />
      </div>
      <div>
        <Link href="/">
          <img src="" alt="logo title" />
        </Link>
      </div>
      <div>
        <Link href="/login">
          <button
            className="border border-yellow-500 bg-yellow-450 text-black rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-gray-400 focus:outline-none focus:shadow-outline"
            type="button"
          >
            Login
          </button>
        </Link>
      </div>
    </div>
  )
}

export default Header
