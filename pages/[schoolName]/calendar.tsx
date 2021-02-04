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
  AppointmentForm,
  DragDropProvider,
  EditRecurrenceMenu,
} from '@devexpress/dx-react-scheduler-material-ui'
import { useMutation, useQuery } from '@apollo/client'
import { gql } from '@apollo/client'

const GET_EVENTS = gql`
  query getEvents {
    allEvents {
      title
      startDate
      endDate
      id
      rRule
      location
      type
    }
  }
`

const UPDATE_EVENT = gql`
  mutation updateEvent($id: ID!, $data: EventUpdateInput!) {
    updateEvent(id: $id, data: $data) {
      title
      startDate
      endDate
      rRule
      location
      type
    }
  }
`

const DELETE_EVENT = gql`
  mutation deleteEvent($id: ID!) {
    deleteEvent(id: $id) {
      id
    }
  }
`

interface EventModel {
  title: string
  notes?: string
  startDate: Date
  endDate: Date
  id: number
  rRule?: string
  location: string
  type: string
}

interface EventModelWithoutId {
  title: string
  notes?: string
  startDate: Date
  endDate: Date
  id?: number
  rRule?: string
  location: string
  type: string
}

const CalendarComponent: React.SFC = () => {
  const { data: { allEvents } = {} } = useQuery<EventModel[]>(GET_EVENTS)
  const [EventUpdate] = useMutation(UPDATE_EVENT)
  const [DeleteUpdate] = useMutation(DELETE_EVENT)

  const [currentDate, setCurrentDate] = useState<SchedulerDateTime>(new Date())
  const [appointments, setAppointments] = useState<any[]>([])
  const [refreshTable, setRefreshTable] = useState<boolean>(true)

  useEffect(() => {
    if (refreshTable) {
      if (allEvents) {
        setAppointments(allEvents)
      }
      setRefreshTable(false)
    }
  }, [appointments, refreshTable])

  /*
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
*/

  const resources = [
    {
      fieldName: 'type',
      title: 'Type',
      instances: [
        // ne pas supprimer pour le moment, à tester la prochaine semaine de projet ou celle d'après pour la gestion des couleurs.
        // appointments ? appointments.map(({type}) =>

        //   [{ id: type, text: type }]

        //   ) :
        //   []
        { id: 'fromage', text: 'Fromage', color: '#080808' },
        { id: 'Tacos', text: 'Tacos', color: '#7E57C2' },
        { id: 'kebab', text: 'kebab', color: '#469213' },
        { id: 'burger', text: 'burger' },
        { id: 'pizza', text: 'pizza' },
      ],
    },
  ]

  const currentDateChange = (currentDate: Date) => {
    setCurrentDate(currentDate)
  }

  const commitChanges = ({ added, changed, deleted }: AppointmentModel) => {
    // console.log(':o')
    // console.log('%cCalendarComponent.tsx line:79 added', 'color: white; background-color: #007acc;', added);
    //console.log('%cCalendarComponent.tsx line:80 changed', 'color: white; background-color: #007acc;', changed);
    // console.log('%cCalendarComponent.tsx line:81 deleted', 'color: white; background-color: #007acc;', deleted);
    let data = appointments
    if (added) {
      //A FAIRE
      const startingAddedId = data.length > 0 ? data[data.length - 1].id + 1 : 0
      data = [...data, { id: startingAddedId, ...added }]
    }
    if (changed) {
      data = data.map((appointment) =>
        changed[appointment.id] ? { ...appointment, ...changed[appointment.id] } : appointment
      )

      const objectId = Object.keys(changed)[0]
      const bodyData = data.filter((item) => item.id === objectId)
      const event = bodyData[0]
      const dataChange: EventModelWithoutId = {
        title: event.title,
        endDate: event.endDate,
        rRule: event.rRule,
        startDate: event.startDate,
        location: event.location,
        type: event.type,
      }

      EventUpdate({ variables: { id: objectId, data: dataChange } })
    }
    if (deleted !== undefined) {
      data = data.filter((appointment) => appointment.id !== deleted)
      DeleteUpdate({ variables: { id: deleted } })
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
        <AppointmentForm />
        <DragDropProvider />
        <Resources data={resources} mainResourceName="type" />
      </Scheduler>
    </Paper>
  )
}

export default CalendarComponent
