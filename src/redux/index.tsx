import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { reduxActions } from './ducks'
import Clock from './Clock'
import Counter from './Counter'
import RootState from 'domain/RootState'

const ExampleWithRedux = () => {
  const state = useSelector((state: RootState) => state)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(reduxActions.startClock())
  }, [dispatch])

  return (
    <>
      <Clock />
      <Counter />
      <pre className={'codeStyle'}>
        <code>{JSON.stringify(state, null, 4)}</code>
      </pre>
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

export default ExampleWithRedux
