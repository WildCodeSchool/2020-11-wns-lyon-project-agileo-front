import * as types from './types'
import { ThunkDispatch } from 'domain/ThunkDispatch'

export const startClock = () => (dispatch: ThunkDispatch) => {
  setInterval(() => {
    return dispatch({
      type: types.TICK,
      payload: {
        light: true,
        lastUpdate: Date.now(),
      },
    })
  }, 1000)
}
