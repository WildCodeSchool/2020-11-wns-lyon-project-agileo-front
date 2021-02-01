import * as types from './types'
import { CustomAction } from 'domain/CustomAction'
import { CalendarState } from './domain'

const initialCalendarState: CalendarState = {
  example: '',
}

const reducer = (state: CalendarState = initialCalendarState, action: CustomAction<CalendarState>) => {
  switch (action.type) {
    case types.EXAMPLE:
      return {
        ...state,
        example: action.payload,
      }
    default:
      return state
  }
}

export default reducer
