import React, {useState} from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import {GET_EVENTS} from './ducks/graphql';
import { useQuery } from '@apollo/client'

const CalendarComponent = (props: any) => {
const dataEvents = [{
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
},{
  id: 2,
  title: 'event 3',
  start: new Date(2021, 0, 12),
  end: new Date(2021, 0, 14),
},{
  id: 3,
  title: 'et 4',
  start: new Date(2021, 0, 24),
  end: new Date(2021, 0, 29),
},]
// Setup the localizer by providing the moment (or globalize) Object
// to the correct localizer.
const localizer = momentLocalizer(moment) // or globalizeLocalizer
const DnDCalendar = withDragAndDrop(Calendar);
const [events, setEvents] = useState(dataEvents)
//const dataEvents = useQuery(GET_EVENTS)
    //console.log(dataEvents)
  
      const onEventDrop = ({ event, start, end }) => {
    
        const idx = event.id;
        const updatedEvent = { ...event, start, end };
    
        const nextEvents = [...events];
        // const machin = nextEvents.filter(item => item.id === idx)
        nextEvents.splice(idx, 1, updatedEvent);
    
        setEvents(nextEvents);
      }

      const onEventResize = (resizeType, { event, start, end }) => {
        console.log('?')
    
        const nextEvents = events.map(existingEvent => {
          return existingEvent.id === event.id
            ? { ...existingEvent, start, end }
            : existingEvent;
        });
        console.log(nextEvents)
    
        setEvents(nextEvents);
      };

      return (
  <div>
    <DnDCalendar
      defaultDate={moment().toDate()}
      defaultView="month"
      events={events}
      localizer={localizer}
      onEventDrop={onEventDrop}
      onEventResize={onEventResize}
      resizable
      style={{ height: "100vh" }}
    />
  </div>
      )
}

export default CalendarComponent;