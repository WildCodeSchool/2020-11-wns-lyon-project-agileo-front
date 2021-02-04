import { gql } from '@apollo/client'

export const GET_EVENTS = gql`
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

export const UPDATE_EVENT = gql`
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

export const DELETE_EVENT = gql`
  mutation deleteEvent($id: ID!) {
    deleteEvent(id: $id) {
      id
    }
  }
`
