import * as types from './types'
import { CustomAction } from 'domain/CustomAction'
import { ProfileState } from './domain'

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
