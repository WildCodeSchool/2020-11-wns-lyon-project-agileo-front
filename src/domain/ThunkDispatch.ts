import { Action } from 'redux'
import { ThunkDispatch as Dispatch } from 'redux-thunk'
import RootState from './RootState'

export type ThunkDispatch = Dispatch<RootState, undefined, Action>
