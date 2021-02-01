import * as types from './types'
import { ThunkDispatch } from 'domain/ThunkDispatch'

export const incrementCount = () => ({ type: types.INCREMENT })
export const decrementCount = () => ({ type: types.DECREMENT })
export const resetCount = () => ({ type: types.RESET })

export const startClock = () => (dispatch: ThunkDispatch) =>
  setInterval(() => {
    dispatch({ type: types.TICK, payload: { light: true, lastUpdate: Date.now() } })
  }, 1000)
