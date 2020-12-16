import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

const Header = () => {
  return (
    <div className="flex justify-between bg-indigo-600 h-16">
      <div className="mr-8">
        <Image src="/images/logo.svg" alt="Logo" width={50} height={50} />
      </div>
      <div>
        <Link href="/">
          <img src="" alt="logo title" />
        </Link>
      </div>
      <div className="bg-yellow-450 h-5 mt-3 p-5 rounded">
        <Link href="/login">
          <button className="text-center" type="button">
            Login
          </button>
        </Link>
      </div>
    </div>
  )
}

export default Header
