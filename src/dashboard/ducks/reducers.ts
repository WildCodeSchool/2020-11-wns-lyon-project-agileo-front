import * as types from './types'
import { CustomAction } from 'domain/CustomAction'
import { DashboardState } from './domain'

const initialDashboardState: DashboardState = {
  example: '',
}

const reducer = (state: DashboardState = initialDashboardState, action: CustomAction<DashboardState>) => {
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
