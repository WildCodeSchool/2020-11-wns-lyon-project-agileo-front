import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import cx from 'classnames'
import { Transition } from '@headlessui/react'
import { Slide } from 'components/index'
import { gql, useMutation, useQuery } from '@apollo/client'

const UNAUTHENTICATE = gql`
  mutation {
    unauthenticateUser {
      success
    }
  }
`

const AUTHENTICATED_USER = gql`
  query authenticatedUser {
    authenticatedUser {
      id
    }
  }
`

const HeaderDashboard = () => {
  const { data: { authenticatedUser } = {} } = useQuery(AUTHENTICATED_USER)
  const [unauthenticate] = useMutation(UNAUTHENTICATE, {
    refetchQueries: ['authenticatedUser'],
  })

  const router = useRouter()

  if (!authenticatedUser) {
    router.push('/login')
  }

  const links = [
    { href: '/schoolName/dashboard', label: 'Dashboard' },
    { href: '/schoolName/dashboard/team', label: 'Team' },
    { href: '/schoolName/dashboard/courses', label: 'Courses' },
    { href: '/schoolName/dashboard/file-manager', label: 'File Manager' },
    { href: '/schoolName/dashboard/chat', label: 'Chat' },
    { href: '/schoolName/dashboard/calendar', label: 'Calendar' },
    { href: '/schoolName/dashboard/meet', label: 'Meet' },
  ]

  const links2 = [
    { href: '/schoolName/dashboard/my-profile', label: 'Your Profile' },
    { href: '', label: 'Settings' },
    { href: '/login', label: 'Sign out' },
  ]

  const [isOpen, setIsOpen] = useState(false)
  const [isOpen2, setIsOpen2] = useState(false)

  return (
    <>
      <div>
        <nav className="bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <Link href="/schoolName/dashboard">
                  <a className="flex-shrink-0">
                    <img
                      className="hidden lg:block h-8 w-auto"
                      src="https://ext.boulgour.com/lifl/beaufils/logos/logo-inria.svg"
                      alt="School Logo"
                    />
                  </a>
                </Link>
                <div className="hidden md:block">
                  <div className="ml-10 flex items-baseline space-x-4">
                    {links.map(({ href, label }, key) => (
                      <Link key={key} href={href}>
                        <a
                          className={cx(
                            'px-3 py-2 rounded-md text-sm font-medium focus:outline-none focus:text-white focus:bg-gray-700',
                            useRouter().asPath === href
                              ? 'text-white bg-gray-900'
                              : 'text-gray-300 hover:text-white hover:bg-gray-700'
                          )}
                        >
                          {label}
                        </a>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              <div className="hidden md:block">
                <div className="ml-4 flex items-center md:ml-6">
                  <div className="ml-3 relative">
                    <div>
                      <button
                        type="button"
                        onClick={() => setIsOpen(!isOpen)}
                        className="max-w-xs flex items-center text-sm rounded-full text-white focus:outline-none focus:shadow-solid"
                        id="user-menu"
                        aria-label="User menu"
                        aria-haspopup="true"
                      >
                        <img
                          className="h-8 w-8 rounded-full"
                          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                          alt=""
                        />
                      </button>
                    </div>
                    <Transition
                      show={isOpen}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-100 scale-100"
                    >
                      <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg">
                        <div
                          className="py-1 rounded-md bg-white shadow-xs"
                          role="menu"
                          aria-orientation="vertical"
                          aria-labelledby="user-menu"
                        >
                          <Link href="/schoolName/dashboard/my-profile">
                            <a className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
                              Your Profile
                            </a>
                          </Link>
                          <a
                            type="button"
                            onClick={() => setIsOpen2(!isOpen2)}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            role="menuitem"
                          >
                            Settings
                          </a>
                          <a
                            onClick={() => unauthenticate()}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            role="menuitem"
                          >
                            Sign out
                          </a>
                        </div>
                      </div>
                    </Transition>
                  </div>
                </div>
              </div>
              <div className="-mr-2 flex md:hidden">
                <button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700 focus:text-white">
                  <svg className="block h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                  <svg className="hidden h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <div className="hidden md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {links.map(({ href, label }, key) => (
                <Link key={key} href={href}>
                  <a
                    className={cx(
                      'block px-3 py-2 rounded-md text-base font-medium focus:outline-none focus:text-white focus:bg-gray-700',
                      useRouter().asPath === href
                        ? 'text-white bg-gray-900'
                        : 'text-gray-300 hover:text-white hover:bg-gray-700'
                    )}
                  >
                    {label}
                  </a>
                </Link>
              ))}
            </div>
            <div className="pt-4 pb-3 border-t border-gray-700">
              <div className="flex items-center px-5 space-x-3">
                <div className="flex-shrink-0">
                  <img
                    className="h-10 w-10 rounded-full"
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt=""
                  />
                </div>
                <div className="space-y-1">
                  <div className="text-base font-medium leading-none text-white">Tom Cook</div>
                  <div className="text-sm font-medium leading-none text-gray-400">tom@example.com</div>
                </div>
              </div>
              <div className="mt-3 px-2 space-y-1">
                {links2.map(({ href, label }, key) => (
                  <Link key={key} href={href}>
                    <a className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700">
                      {label}
                    </a>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </nav>
        <Transition
          show={isOpen2}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-100 scale-100"
        >
          <Slide setIsOpen2={setIsOpen2} isOpen2={isOpen2} />
        </Transition>

        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold leading-tight text-gray-900">
              {links.map((link) => useRouter().asPath === link.href && link.label)}
              {links2.map((link) => useRouter().asPath === link.href && link.label)}
            </h1>
          </div>
        </header>
      </div>
    </>
  )
}

export default HeaderDashboard
