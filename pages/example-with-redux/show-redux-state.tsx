import { useSelector } from 'react-redux'
import Link from 'next/link'
import RootState from 'domain/RootState'
import React from 'react'

const ShowReduxState = () => {
  const state = useSelector((state: RootState) => state)

  return (
    <>
      <pre className={'codeStyle'}>
        <code>{JSON.stringify(state, null, 4)}</code>
      </pre>
      <Link href="/">
        <a>Go Back Home</a>
      </Link>
      <style jsx>{`
        .codeStyle {
          background: #ebebeb;
          width: 400px;
          padding: 10px;
          border: 1px solid grey;
          margin-bottom: 10px;
        }
      `}</style>
    </>
  )
}

export default ShowReduxState
