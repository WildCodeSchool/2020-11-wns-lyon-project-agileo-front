import { gql } from '@apollo/client'

export const GET_EVENTS = gql`
  query getEvents {
    allEvents {
      title
      start
      end
      id
      rRules
      localtion
      type
    }
  }
`

export const UPDATE_EVENT = gql`
  mutation updateEvent($id: ID!, $data: EventUpdateInput) {
    updateEvent(id: $id, data: $data) {
      title
      start
      end
      rRules
      localtion
      type
    }
  }
`

export const DELETE_EVENT = gql`
  mutation DeleteEvent($id: ID!, $data: EventDeleteInput) {
    DeleteEvent(id: $id, data: $data) {
      id
    }
  }
`
