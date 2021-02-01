import React, { useState, useEffect } from 'react'
import Paper from '@material-ui/core/Paper'
import { AppointmentModel, ViewState, SchedulerDateTime, EditingState } from '@devexpress/dx-react-scheduler'
import {
  Scheduler,
  Appointments,
  Resources,
  WeekView,
  Toolbar,
  DateNavigator,
  TodayButton,
  AppointmentTooltip,
  DragDropProvider,
  EditRecurrenceMenu,
} from '@devexpress/dx-react-scheduler-material-ui'
//import { GET_EVENTS, UPDATE_DRAG_EVENT } from './ducks/graphql';
//import { useMutation, useQuery } from '@apollo/client';

const CalendarComponent: React.SFC = () => {
  //const [dragEventUpdate] = useMutation(UPDATE_DRAG_EVENT)
  //dragEventUpdate({ variables: { id: idx, data: {start: updatedEvent.start, end: updatedEvent.end}}})
  const [currentDate, setCurrentDate] = useState<SchedulerDateTime>(new Date())
  const [appointments, setAppointments] = useState<any[]>([])
  const [refreshTable, setRefreshTable] = useState<boolean>(true)

  const appointmentsRessources: Array<AppointmentModel> = [
    {
      title: 'Website Re-Design Plan',
      startDate: new Date(2021, 0, 30, 9, 35),
      endDate: new Date(2021, 0, 30, 11, 30),
      id: 0,
      rRule: 'FREQ=DAILY;COUNT=4',
      location: 'Room 1',
      type: 'truc',
    },
    {
      title: 'Book Flights to San Fran for Sales Trip',
      startDate: new Date(2021, 1, 7, 12, 11),
      endDate: new Date(2021, 1, 7, 13, 0),
      id: 1,
      location: 'Room 1',
      type: 'machin',
    },
    {
      title: 'Install New Router in Dev Room',
      startDate: new Date(2021, 1, 3, 14, 30),
      endDate: new Date(2021, 1, 3, 15, 35),
      id: 2,
      location: 'Room 2',
      type: 'chose',
    },
  ]
  const resources = [
    {
      fieldName: 'type',
      title: 'Type',
      instances: [
        { id: 'truc', text: 'Truc', color: '#080808' },
        { id: 'chose', text: 'Chose', color: '#7E57C2' },
        { id: 'machin', text: 'Machin', color: '#469213' },
      ],
    },
  ]

  useEffect(() => {
    if (refreshTable) {
      setAppointments(appointmentsRessources)
      setRefreshTable(false)
    }
  }, [appointmentsRessources, refreshTable])

  const currentDateChange = (currentDate) => {
    setCurrentDate(currentDate)
  }

  const commitChanges = ({ added, changed, deleted }) => {
    let data = appointments
    if (added) {
      const startingAddedId = data.length > 0 ? data[data.length - 1].id + 1 : 0
      data = [...data, { id: startingAddedId, ...added }]
    }
    if (changed) {
      data = data.map((appointment) =>
        changed[appointment.id] ? { ...appointment, ...changed[appointment.id] } : appointment
      )
    }
    if (deleted !== undefined) {
      data = data.filter((appointment) => appointment.id !== deleted)
    }
    setAppointments(data)
    return data
  }

  return (
    <Paper>
      <Scheduler data={appointments} height={660}>
        <ViewState currentDate={currentDate} onCurrentDateChange={currentDateChange} />

        <WeekView startDayHour={9} endDayHour={19} />
        <Toolbar />
        <DateNavigator />
        <TodayButton />
        <EditingState onCommitChanges={commitChanges} />
        <EditRecurrenceMenu />
        <Appointments />
        <AppointmentTooltip showOpenButton />
        <DragDropProvider />
        <Resources data={resources} />
      </Scheduler>
    </Paper>
  )
}

export default CalendarComponent
