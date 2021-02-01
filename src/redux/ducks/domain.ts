export interface CounterState {
  value: number
}

export interface ClockState {
  lastUpdate: number
  light: boolean
}
export interface ReduxState {
  counter: CounterState
  clock: ClockState
}
