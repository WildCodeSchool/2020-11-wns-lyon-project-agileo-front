import { ChatState } from 'src/chat/ducks/domain'
import { TeamsState } from 'src/teams/ducks/domain'
import { ProfileState } from 'src/profile/ducks/domain'
import { MeetState } from 'src/meet/ducks/domain'
import { LoginState } from 'src/login/ducks/domain'
import { DriveState } from 'src/drive/ducks/domain'
import { DashboardState } from 'src/dashboard/ducks/domain'
import { CoursesState } from 'src/courses/ducks/domain'
import { CalendarState } from 'src/calendar/ducks/domain'
import { ReduxState } from 'src/redux/ducks/domain'

export default interface RootState {
  chat: ChatState
  teams: TeamsState
  profile: ProfileState
  meet: MeetState
  login: LoginState
  drive: DriveState
  dashboard: DashboardState
  courses: CoursesState
  calendar: CalendarState
  redux: ReduxState
}
