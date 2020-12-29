import { gql } from '@apollo/client'

export const EXAMPLE = gql`
  query example {
    example {
      id
      name
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
