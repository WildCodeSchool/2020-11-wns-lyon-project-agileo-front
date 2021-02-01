import { gql } from '@apollo/client'

export const GET_EVENTS = gql`
  query getEvents {
    allEvents {
      title
      allDay
      start
      end
    }
  }
`

export const UPDATE_DRAG_EVENT = gql`
  mutation updateEvent($id: ID!, $data: EventUpdateInput) {
    updateEvent(id: $id, data: $data) {
      id
      start
      end
    }
  }
`
