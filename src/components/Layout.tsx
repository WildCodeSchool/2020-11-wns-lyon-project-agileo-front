import React, { FunctionComponent } from 'react'
import { useRouter } from 'next/router'
import { Header, HeaderDashboard } from 'components/index'

const Layout: FunctionComponent = ({ children }) => {
  const isDashboard: boolean = useRouter().asPath.includes('dashboard')

  return (
    <>
      {isDashboard ? <HeaderDashboard /> : <Header />}

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">{children}</div>
      </div>

      {/* <Footer /> */}
    </>
  )
}

export default Layout
