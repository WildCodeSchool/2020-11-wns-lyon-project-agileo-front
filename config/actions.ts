import * as types from './types'

export const example = () => (dispatch) =>
  dispatch({
    type: types.EXAMPLE,
    payload: example,
  })
