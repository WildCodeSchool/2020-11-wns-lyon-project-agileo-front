import { gql } from '@apollo/client'

export const AUTHENTICATE = gql`
  mutation authenticate($email: String!, $password: String!) {
    authenticateUserWithPassword(email: $email, password: $password) {
      item {
        id
      }
    }
  }
`

export const AUTHENTICATED_USER = gql`
  query authenticatedUser {
    authenticatedUser {
      id
    }
  }
`

export const UNAUTHENTICATE = gql`
  mutation {
    unauthenticateUser {
      success
    }
  }
`
