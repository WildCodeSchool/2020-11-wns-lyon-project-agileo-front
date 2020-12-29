import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { reduxActions } from './ducks'
import RootState from 'domain/RootState'
import { Button } from '@material-ui/core'

const useCounter = () => {
  const count = useSelector((state: RootState) => state.redux.counter.value)
  const dispatch = useDispatch()
  const increment = () => dispatch(reduxActions.incrementCount())
  const decrement = () => dispatch(reduxActions.decrementCount())
  const reset = () => dispatch(reduxActions.resetCount())
  return { count, increment, decrement, reset }
}

const Counter = () => {
  const { count, increment, decrement, reset } = useCounter()

  return (
    <div>
      <h1>
        Count: <span>{count}</span>
      </h1>
      <Button onClick={increment}>+1</Button>
      <Button onClick={decrement}>-1</Button>
      <Button onClick={reset}>Reset</Button>
    </div>
  )
}

export default Counter
