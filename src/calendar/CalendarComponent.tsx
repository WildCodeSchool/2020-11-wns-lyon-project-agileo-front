import React, { useState, FunctionComponent } from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop'
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { GET_EVENTS } from './ducks/graphql'
import { useQuery } from '@apollo/client'
interface EventInterface {
  id: number
  title: string
  allDay?: boolean
  start: Date
  end: Date
}
type eventProps = {
  event: EventInterface
  start: Date
  end: Date
}
const CalendarComponent: FunctionComponent<EventInterface[]> = () => {
  const dataEvents = [
    {
      id: 0,
      title: 'All Day Event very long title',
      allDay: false,
      start: new Date(2021, 0, 3),
      end: new Date(2021, 0, 4),
    },
    {
      id: 1,
      title: 'Long Event',
      start: new Date(2021, 0, 8),
      end: new Date(2021, 0, 8),
    },
    {
      id: 2,
      title: 'event 3',
      start: new Date(2021, 0, 12),
      end: new Date(2021, 0, 14),
    },
    {
      id: 3,
      title: 'et 4',
      start: new Date(2021, 0, 24),
      end: new Date(2021, 0, 29),
    },
  ]
  // Setup the localizer by providing the moment (or globalize) Object
  // to the correct localizer.
  const localizer = momentLocalizer(moment) // or globalizeLocalizer
  const DnDCalendar = withDragAndDrop(Calendar)

  const { data: { allEvents } = {} } = useQuery<EventInterface[]>(GET_EVENTS)

  const [events, setEvents] = useState<EventInterface[]>(dataEvents)

  console.log(dataEvents)
  console.log(allEvents)
  const onEventDrop = ({ event, start, end }: eventProps) => {
    const idx = event.id
    const updatedEvent = { ...event, start, end }
    const nextEvents = [...events]
    nextEvents.splice(idx, 1, updatedEvent)
    setEvents(nextEvents)
  }

  const onEventResize = (resizeType: any[], { event, start, end }: eventProps) => {
    console.log('?')
    const nextEvents = events.map((existingEvent) => {
      return existingEvent.id === event.id ? { ...existingEvent, start, end } : existingEvent
    })
    setEvents(nextEvents)
  }

  return (
    <div>
      {allEvents && (
        <DnDCalendar
          defaultDate={moment().toDate()}
          defaultView="month"
          events={events}
          localizer={localizer}
          onEventDrop={onEventDrop}
          onEventResize={onEventResize}
          resizable
          style={{ height: '100vh' }}
        />
      )}
    </div>
  )
}

export default CalendarComponent
