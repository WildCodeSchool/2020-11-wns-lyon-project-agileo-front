import * as types from './types'
import { CustomAction } from 'domain/CustomAction'
import { MeetState } from './domain'

const initialMeetState: MeetState = {
  example: '',
}

const reducer = (state: MeetState = initialMeetState, action: CustomAction<MeetState>) => {
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
