/* INJECT_IMPORT */
import { CounterState } from 'core/counter/domain'
import { ClockState } from 'core/clock/domain'

export default interface RootState {
  /* INJECT_EXPORT */
  clock: ClockState
  counter: CounterState
}
