import * as types from './types'
import { CustomAction } from 'domain/CustomAction'
import { CounterState } from './domain'

const initialCounterState: CounterState = {
  value: 0,
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

export default counterReducer
