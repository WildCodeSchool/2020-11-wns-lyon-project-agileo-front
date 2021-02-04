import React from 'react'
import { ApolloProvider } from '@apollo/client'
import { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import { useStore } from 'config/store'
import { useApollo } from 'config/apollo'
import HeadAgileo from 'components/HeadAgileo'
import HeaderDashboard from 'components/HeaderDashboard'
import { ThemeProvider } from '@material-ui/styles'
import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles'
import '../styles/style.css'

function MyApp({ Component, pageProps, router }: AppProps) {
  const store = useStore(pageProps.initialReduxState)
  const apolloClient = useApollo(pageProps.initialApolloState)

  let theme = createMuiTheme({
    palette: {
      primary: {
        light: '#BEF4D4',
        main: '#2AB1BF',
        contrastText: '#ffffff',
      },
      secondary: {
        light: '#FFF1C8',
        main: '#FCC116',
      },
      tonalOffset: 0.2,
    },
    typography: {
      fontFamily: 'Roboto, sans-serif',
    },
    overrides: {
      MuiTypography: {
        root: {
          fontFamily: 'Roboto, sans-serif',
        },
        h4: {
          fontFamily: 'Lobster, cursive',
          padding: '2rem',
        },
        h5: {
          fontFamily: 'Lobster, cursive',
          padding: '1rem',
        },
      },
      MuiToolbar: {
        root: {
          justifyContent: 'space-between',
        },
      },
      MuiButton: {
        label: {
          fontSize: '1rem',
          letterSpacing: 1,
        },
      },
      MuiContainer: {
        root: {
          display: 'flex',
          flexDirection: 'column',
        },
      },
    },
  })
  theme = responsiveFontSizes(theme)

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <HeadAgileo />
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
      </ThemeProvider>
    </Provider>
  )
}

export default MyApp
