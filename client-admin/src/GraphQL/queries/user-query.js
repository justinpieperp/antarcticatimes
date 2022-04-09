import { gql } from '@apollo/client'

const GET_USERS = gql`
query{
  getUsers {
    email,
    _id,
    username,
    posts {
      title
    }
  }
}
`

const GET_USER_BY_ID = gql`
query GetUserById($id: ID!) {
  getUserById(_id: $id) {
    username
    email,
    _id,
    posts {
      title
    }
  }
}
`

export {
  GET_USERS,
  GET_USER_BY_ID
}
