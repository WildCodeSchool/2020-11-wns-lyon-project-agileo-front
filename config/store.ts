import { applyMiddleware, combineReducers, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import * as reducers from './reducers'
import thunk, { ThunkMiddleware } from 'redux-thunk'
import { useMemo } from 'react'

let store: any

function initStore(initialState: any) {
  return createStore(
    combineReducers({ ...reducers }),
    initialState,
    composeWithDevTools(applyMiddleware(thunk as ThunkMiddleware))
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
