import * as types from './types'
import { CustomAction } from 'domain/CustomAction'
import { DriveState } from './domain'

const initialDriveState: DriveState = {
  example: '',
}

const reducer = (state: DriveState = initialDriveState, action: CustomAction<DriveState>) => {
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
