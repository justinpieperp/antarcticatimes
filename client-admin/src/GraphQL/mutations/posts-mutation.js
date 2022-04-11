import { gql } from '@apollo/client'

const CREATE_POST = gql`
mutation CreatePost(
    $title: String!
    $user: String!
    $description: String
    $body: String!
    $imageURL: String
    $category: String!
    $tags: [String]
  ) {
    createPost(
        title: $title
        user: $user
        description: $description
        body: $body
        imageURL: $imageURL
        category: $category
        tags: $tags
      ) {
        title
      }
}
`

const DELETE_POST = gql`
mutation DeletePost($id: ID!) {
    deletePost(_id: $id)
}
`

const UPDATE_POST = gql`
mutation UpdatePost(
    $id: ID!
    $title: String
    $user: ID
    $description: String
    $body: String
    $imageURL: String
    $category: ID
    $tags: [String]
  ) {
    updatePost(
        _id: $id
        title: $title
        user: $user
        description: $description
        body: $body
        imageURL: $imageURL
        category: $category
        tags: $tags
      ) {
        _id
      }
}
`

export {
  CREATE_POST,
  DELETE_POST,
  UPDATE_POST
}
