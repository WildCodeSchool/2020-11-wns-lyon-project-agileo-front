import * as types from './types'
import { CustomAction } from 'domain/CustomAction'
import { LoginState } from './domain'

const initialLoginState: LoginState = {
  example: '',
}

const reducer = (state: LoginState = initialLoginState, action: CustomAction<LoginState>) => {
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
