import { Action, applyMiddleware, combineReducers, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import * as reducers from 'src'
import thunk, { ThunkMiddleware } from 'redux-thunk'
import { useMemo } from 'react'
import RootState from 'src/shared/domain/RootState'
import isServer from 'src/shared/helpers/isServer'

let store: any

function initStore(initialState: any) {
  return createStore(
    combineReducers({ ...reducers }),
    initialState,
    composeWithDevTools(applyMiddleware(thunk as ThunkMiddleware<RootState, Action>))
  )
}

export const initializeStore = (preloadedState: any) => {
  let _store = store ?? initStore(preloadedState)
  if (preloadedState && store) {
    _store = initStore({ ...store.getState(), ...preloadedState })
    store = undefined
  }
  if (isServer()) return _store
  if (!store) store = _store
  return _store
}

export function useStore(initialState: any) {
  return useMemo(() => initializeStore(initialState), [initialState])
}
