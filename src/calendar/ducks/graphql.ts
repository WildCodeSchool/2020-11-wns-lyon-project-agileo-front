import { gql } from '@apollo/client'

export const GET_EVENTS = gql`
  query getEvents {
    Event {
      title
      allDay
      start
      end
    }
  }
`

export const EXAMPLE1 = gql`
  mutation example {
    example {
      id
      name
    }
  }
`
