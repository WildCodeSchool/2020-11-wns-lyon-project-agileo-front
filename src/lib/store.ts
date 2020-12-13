import { Action, applyMiddleware, combineReducers, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import * as reducers from 'src/core'
import thunk, { ThunkMiddleware } from 'redux-thunk'
import { useMemo } from 'react'
import RootState from 'domain/RootState'

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
  if (typeof window === 'undefined') return _store
  if (!store) store = _store
  return _store
}

export function useStore(initialState: any) {
  return useMemo(() => initializeStore(initialState), [initialState])
}
