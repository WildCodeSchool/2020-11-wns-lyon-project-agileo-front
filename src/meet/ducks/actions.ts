import * as types from './types'
import { ThunkDispatch } from 'domain/ThunkDispatch'

export const example = () => (dispatch: ThunkDispatch) =>
  dispatch({
    type: types.EXAMPLE,
    payload: example,
  })
