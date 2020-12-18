import React, { FormEvent, useState } from 'react'
import { gql, useMutation, useQuery } from '@apollo/client'
import { useRouter } from 'next/router'
import isServer from 'helpers/isServer'
import MuiAlert from '@material-ui/lab/Alert'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Snackbar from '@material-ui/core/Snackbar'
import Footer from './Footer'
import Header from './Header'
import Style from './Style'

const AUTHENTICATE = gql`
  mutation authenticate($email: String!, $password: String!) {
    authenticateUserWithPassword(email: $email, password: $password) {
      item {
        id
      }
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

const Login = () => {
  const intialstate = { email: '', password: '' }
  const [form, setForm] = useState(intialstate)
  const router = useRouter()
  const { data: { authenticatedUser } = {}, loading, error } = useQuery(AUTHENTICATED_USER)
  const [authenticate, { loading: signingIn, error: signinError }] = useMutation(AUTHENTICATE, {
    refetchQueries: ['authenticatedUser'],
  })

  const Alert = (props: any) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />
  }

  const handleCloseSnackbar = (event: any, reason: string) => {
    if (reason === 'clickaway') {
      return
    }
    setSnackbarStatus({ open: false, message: '' })
  }
  const [snackbarStatus, setSnackbarStatus] = useState({ open: true, message: 'Mot de pass ou email incorrect' })

  const handleClick = async (e: FormEvent) => {
    e.preventDefault()
    try {
      await authenticate({ variables: { email: form.email, password: form.password } })
    } catch (err) {
      return err
    }
    setForm(intialstate)
  }

  if (!isServer() && authenticatedUser) {
    router.push('/schoolName/dashboard')
  }

  return (
    <>
      <Header />
      <div className="min-h-full bg-yellow-550 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 fix-footer">
        <div className="max-w-md w-full">
          <div>
            <h2 className="mt-6 text-center text-3xl text-orange-450 leading-9 font-extrabold">Me connecter</h2>
          </div>
          {loading || (signingIn && <p>loading...</p>)}
          <>
            {(error || signinError) && (
              <Grid item xs={3}>
                <Paper style={{ borderRadius: '0px', borderColor: '#000', border: '1px' }}>
                  <Snackbar
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                    open={snackbarStatus.open}
                    onClose={handleCloseSnackbar}
                    autoHideDuration={1000}
                  >
                    <Alert onClose={handleCloseSnackbar} severity="warning">
                      {snackbarStatus.message}
                    </Alert>
                  </Snackbar>
                </Paper>
              </Grid>
            )}

            <form className="mt-8" action="#" onSubmit={handleClick}>
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
                    value={form.email}
                    onChange={(event) => {
                      setForm({ ...form, email: event.target.value })
                    }}
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
                    value={form.password}
                    onChange={(event) => {
                      setForm({ ...form, password: event.target.value })
                    }}
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
              </div>
            </form>
          </>
        </div>
      </div>
      <Footer />
      <Style />
    </>
  )
}

export default Login
