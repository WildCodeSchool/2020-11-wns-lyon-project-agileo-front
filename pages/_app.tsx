import 'tailwindcss/tailwind.css'
import { ApolloProvider } from '@apollo/client'
import { AppProps } from 'next/app'
import React from 'react'
import { Provider } from 'react-redux'
import { useStore } from 'src/shared/lib/store'
import { useApollo } from 'src/shared/lib/apollo'
import HeaderDashboard from 'src/shared/HeaderDashboard'
import Head from 'next/head'

function MyApp({ Component, pageProps, router }: AppProps) {
  const store = useStore(pageProps.initialReduxState)
  const apolloClient = useApollo(pageProps.initialApolloState)

  return (
    <Provider store={store}>
      <Head>
        <link href="https://fonts.googleapis.com/css2?family=Lobster&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Overpass&display=swap" rel="stylesheet" />
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
