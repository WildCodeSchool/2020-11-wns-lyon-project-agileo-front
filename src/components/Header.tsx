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
          <a className="text-yellow-450 text-4xl" title="Agileo">
            AGILEO
          </a>
        </Link>
      </div>
      <div>
        <Link href="/login">
          <button
            className="rounded-md bg-yellow-450 text-black px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-blue-450 focus:outline-none focus:shadow-outline"
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
