import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { counterActions } from 'core/counter'
import RootState from 'domain/RootState'
import { Button } from '@material-ui/core'

const Counter = () => {
  const count = useSelector((state: RootState) => state.counter.value)
  const dispatch = useDispatch()

  return (
    <div>
      <h1>
        Count: <span>{count}</span>
      </h1>
      <Button onClick={() => dispatch(counterActions.incrementCount())}>+1</Button>
      <Button onClick={() => dispatch(counterActions.decrementCount())}>-1</Button>
      <Button onClick={() => dispatch(counterActions.resetCount())}>Reset</Button>
    </div>
  )
}

export default Counter
