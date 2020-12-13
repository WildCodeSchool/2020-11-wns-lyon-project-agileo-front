import { Store } from 'redux'
import { ThunkDispatch } from './ThunkDispatch'
import RootState from './RootState'

export default interface ThunkStore extends Store<RootState> {
  dispatch: ThunkDispatch
}
