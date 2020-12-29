import * as types from './types'
import { CustomAction } from 'domain/CustomAction'
import { ClockState, CounterState } from './domain'
import { combineReducers } from 'redux'

const initialCounterState: CounterState = {
  value: 0,
}

const initialClockState: ClockState = {
  lastUpdate: 0,
  light: false,
}

const counterReducer = (state: CounterState = initialCounterState, action: CustomAction<CounterState>) => {
  switch (action.type) {
    case types.INCREMENT:
      return {
        ...state,
        value: state.value + 1,
      }
    case types.DECREMENT:
      return {
        ...state,
        value: state.value - 1,
      }
    case types.RESET:
      return {
        ...state,
        value: initialCounterState.value,
      }
    default:
      return state
  }
}

const clockReducer = (state: ClockState = initialClockState, action: CustomAction<ClockState>) => {
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

export default combineReducers({ counter: counterReducer, clock: clockReducer })
