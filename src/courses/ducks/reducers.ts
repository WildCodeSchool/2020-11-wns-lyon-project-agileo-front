import * as types from './types'
import { CustomAction } from 'domain/CustomAction'
import { CoursesState } from './domain'

const initialCoursesState: CoursesState = {
  example: '',
}

const reducer = (state: CoursesState = initialCoursesState, action: CustomAction<CoursesState>) => {
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
