import * as types from './types'
import { CustomAction } from 'domain/CustomAction'
import { ClockState } from './domain'

const initialClockState: ClockState = {
  value: {
    lastUpdate: 0,
    light: false,
  },
}

const timerReducer = (state: ClockState = initialClockState, action: CustomAction<ClockState>) => {
  switch (action.type) {
    case types.TICK:
      return {
        ...state,
        value: action.payload,
      }
    default:
      return state
  }
}

export default timerReducer
