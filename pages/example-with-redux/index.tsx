import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import Link from 'next/link'
import { clockActions } from 'core/clock'
import { Clock, Counter } from 'src/components'

const ExampleWithRedux = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(clockActions.startClock())
  }, [dispatch])

  return (
    <>
      <div style={{ marginBottom: 10 }}>
        <Clock />
        <Counter />
      </div>
      <Link href="/example-with-redux/show-redux-state">
        <a>Click to see current Redux State</a>
      </Link>
    </>
  )
}

export default ExampleWithRedux
