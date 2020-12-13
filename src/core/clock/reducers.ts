import * as types from './types'
import { CustomAction } from 'domain/CustomAction'
import { ClockState } from './domain'

const initialClockState: ClockState = {
  lastUpdate: 0,
  light: false,
}

const timerReducer = (state: ClockState = initialClockState, action: CustomAction<ClockState>) => {
  switch (action.type) {
    case types.TICK:
      return {
        ...state,
        lastUpdate: action.payload.lastUpdate,
        light: action.payload.light,
      }
    default:
      return state
  }
}

export default timerReducer
