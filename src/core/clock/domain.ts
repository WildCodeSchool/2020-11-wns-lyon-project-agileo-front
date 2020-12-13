export interface ClockState {
  value: Clock
}

export interface Clock {
  lastUpdate: number
  light: boolean
}
