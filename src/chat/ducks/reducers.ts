import * as types from './types'
import { CustomAction } from 'domain/CustomAction'
import { ChatState } from './domain'

const initialChatState: ChatState = {
  example: '',
}

const reducer = (state: ChatState = initialChatState, action: CustomAction<ChatState>) => {
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
