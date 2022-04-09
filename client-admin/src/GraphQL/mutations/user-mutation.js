import { gql } from '@apollo/client'

const CREATE_USER = gql`
mutation CreateUser($username: String!, $email: String!, $password: String!) {
    createUser(username: $username, email: $email, password: $password) {
        username
    }
}
`

const DELETE_USER = gql`
mutation DeleteUser($id: ID!) {
    deleteUser(_id: $id)
}
`

const UPDATE_USER = gql`
mutation UpdateUser($_id: ID!, $newUsername: String, $newEmail: String) {
    updateUser(_id: $_id, newUsername: $newUsername, newEmail: $newEmail) {
        username
        email
    }
}
`

export {
  CREATE_USER,
  DELETE_USER,
  UPDATE_USER
}
