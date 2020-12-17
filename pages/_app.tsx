import 'tailwindcss/tailwind.css'
import { ApolloProvider } from '@apollo/client'
import { AppProps } from 'next/app'
import React from 'react'
import { Provider } from 'react-redux'
import { useStore } from 'lib/store'
import { useApollo } from 'lib/apollo'
import { Header, HeaderDashboard, Footer } from 'src/components'
import { useRouter } from 'next/router'
import 'general.css'

function MyApp({ Component, pageProps }: AppProps) {
  const store = useStore(pageProps.initialReduxState)
  const apolloClient = useApollo(pageProps.initialApolloState)
  const isDashboard: boolean = useRouter().asPath.includes('dashboard')

  return (
    <Provider store={store}>
      <ApolloProvider client={apolloClient}>
        {isDashboard ? (
          <>
            <HeaderDashboard />
            <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
              <div className="px-4 py-6 sm:px-0">
                <Component {...pageProps} />
              </div>
            </div>
          </>
        ) : (
          <>
            <Header />
            <Component {...pageProps} />
            <Footer />
          </>
        )}
      </ApolloProvider>
    </Provider>
  )
}

export default MyApp
