import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

const Header = () => {
  return (
    <div className="flex justify-between bg-blue-450 pt-2 pl-3 pr-3 h-seventeen">
      <div className="mr-8">
        <Image src="/images/PublicPage/logo.svg" alt="Logo" width={60} height={60} />
      </div>
      <div className="pt-2">
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
