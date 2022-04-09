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
    $title: String!
    $user: String!
    $description: String
    $body: String!
    $imageURL: String
    $category: String!
    $tags: [String]
  ) {
    updatePost(
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

export {
  CREATE_POST,
  DELETE_POST,
  UPDATE_POST
}
