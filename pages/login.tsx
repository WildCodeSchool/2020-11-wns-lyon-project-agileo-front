import React from 'react'
import Link from 'next/link'

const SignIn = () => {
  return (
    <div className="min-h-full bg-yellow-550 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div>
          <h2 className="mt-6 text-center text-3xl text-orange-450 leading-9 font-extrabold">Me connecter</h2>
        </div>
        <form className="mt-8" action="#" method="POST">
          <input type="hidden" name="remember" value="true" />
          <div className="rounded-md shadow-sm">
            <div>
              <input
                aria-label="Email address"
                name="email"
                type="email"
                required
                className="appearance-none text-center rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5"
                placeholder="Adresse mail"
              />
            </div>
            <div className="-mt-px">
              <input
                aria-label="Password"
                name="password"
                type="password"
                required
                className="appearance-none text-center rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5"
                placeholder="Mot de passe"
              />
            </div>
          </div>

          <div className="mt-6 flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember_me"
                type="checkbox"
                className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
              />
              <label htmlFor="remember_me" className="ml-2 mt-2 block text-sm leading-5">
                Se souvenir de moi
              </label>
            </div>

            <div className="text-sm leading-5">
              <a
                href="#"
                className="font-medium text-orange-450 hover:text-indigo-500 focus:outline-none focus:underline transition ease-in-out duration-150"
              >
                Mot de passe oublié?
              </a>
            </div>
          </div>

          <div className="mt-6">
            <Link href="/schoolName/dashboard">
              <button
                type="submit"
                className="group text-white mb-13 bg-orange-450 rounded-md relative w-full flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md hover:bg-blue-450 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <svg
                    className="h-5 w-5 text-yellow-450 group-hover:text-yellow-450 transition ease-in-out duration-150"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
                Se connecter
              </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SignIn
