import React, { FormEvent, useState } from 'react'
import { gql, useMutation } from '@apollo/client'
import { useRouter } from 'next/router'
import Link from 'next/link'
import MuiAlert from '@material-ui/lab/Alert'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Snackbar from '@material-ui/core/Snackbar'
import style from '../styles/home.module.css'

const AUTHENTICATE = gql`
  mutation authenticate($email: String!, $password: String!) {
    authenticateUserWithPassword(email: $email, password: $password) {
      item {
        id
      }
    }
  }
`

const Login = () => {
  const intialstate = { email: '', password: '' }
  const [form, setForm] = useState(intialstate)
  const router = useRouter()
  const [authenticate, { loading, error }] = useMutation(AUTHENTICATE, { refetchQueries: ['authenticatedUser'] })

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
      router.push('/schoolName/dashboard')
    } catch (err) {
      return err
    }
    setForm(intialstate)
  }

  return (
    <div className="">
      <header className={style.header}>
        <img className="mr-8" src="/logo.svg" alt="Logo" />
        <Link href="/">
          <p className="pt-2 text-yellow-400 text-4xl">AGILEO</p>
        </Link>
        <Link href="/login">
          <button className="rounded-md bg-yellow-400 text-black px-4 py-2 m-2">Login</button>
        </Link>
      </header>
      <div className={style.login}>
        <div className="max-w-md">
          <h2 className="text-center text-3xl text-red-500 font-extrabold">Me connecter</h2>
          {loading && <p>loading...</p>}
          {error && (
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

          <form className="mt-8" onSubmit={handleClick}>
            <input
              placeholder="Adresse mail"
              className="w-full text-center mt-2.5 pl-2.5 h-14"
              value={form.email}
              onChange={(event) => {
                setForm({ ...form, email: event.target.value })
              }}
            />
            <input
              type="password"
              placeholder="Mot de passe"
              className="w-full text-center mt-2.5 pl-2.5 h-14"
              value={form.password}
              onChange={(event) => {
                setForm({ ...form, password: event.target.value })
              }}
            />
            <button type="submit" value="Envoyer" className="w-full bg-red-500 p-3 mt-6">
              <span className="text-yellow-100">Se connecter</span>
            </button>
          </form>
        </div>
      </div>
      <footer className={style.footer}>
        <div className="text-center pt-6 text-yellow-100">© 2020 Agileo</div>
      </footer>
    </div>
  )
}

export default Login
