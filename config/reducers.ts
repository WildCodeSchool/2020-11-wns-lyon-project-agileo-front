import * as types from './types'
import { Action } from 'redux'
import { ProfileState } from './domain'

interface CustomAction<T> extends Action {
  payload: T
}

const initialProfileState: ProfileState = {
  example: '',
}

const reducer = (state: ProfileState = initialProfileState, action: CustomAction<ProfileState>) => {
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
