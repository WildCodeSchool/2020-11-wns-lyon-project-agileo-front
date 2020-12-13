import * as types from './types'
export const incrementCount = () => ({ type: types.INCREMENT })
export const decrementCount = () => ({ type: types.DECREMENT })
export const resetCount = () => ({ type: types.RESET })
