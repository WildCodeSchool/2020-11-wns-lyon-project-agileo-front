import 'tailwindcss/tailwind.css'
import CssBaseline from '@material-ui/core/CssBaseline'
import { ApolloProvider } from '@apollo/client'
import { AppProps } from 'next/app'
import React from 'react'
import { Provider } from 'react-redux'
import { useStore } from 'config/store'
import { useApollo } from 'config/apollo'
import HeaderDashboard from 'components/HeaderDashboard'
import Head from 'next/head'

function MyApp({ Component, pageProps, router }: AppProps) {
  const store = useStore(pageProps.initialReduxState)
  const apolloClient = useApollo(pageProps.initialApolloState)

  return (
    <Provider store={store}>
      <CssBaseline />
      <Head>
        <link rel="shortcut icon" type="image/svg" href="logo.svg" />
        <link href="https://fonts.googleapis.com/css2?family=Lobster&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Overpass&display=swap" rel="stylesheet" />
        <meta name="viewport" content="minimum{/**/}-scale=1, initial-scale=1, width=device-width" />
        <title>Agileo - Une façon innovante d&apos;enseigner à distance</title>
      </Head>
      <ApolloProvider client={apolloClient}>
        {router.query.schoolName ? (
          <>
            <HeaderDashboard />
            <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
              <div className="px-4 py-6 sm:px-0">
                <Component {...pageProps} />
              </div>
            </div>
          </>
        ) : (
          <Component {...pageProps} />
        )}
      </ApolloProvider>
    </Provider>
  )
}

export default MyApp
