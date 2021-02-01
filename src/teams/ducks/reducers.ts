import * as types from './types'
import { CustomAction } from 'domain/CustomAction'
import { TeamsState } from './domain'

const initialTeamsState: TeamsState = {
  example: '',
}

const reducer = (state: TeamsState = initialTeamsState, action: CustomAction<TeamsState>) => {
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
