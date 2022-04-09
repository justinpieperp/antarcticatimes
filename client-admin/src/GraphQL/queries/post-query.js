import { gql } from '@apollo/client'

const GET_POSTS = gql`
query {
    getPosts {
        _id
        title
        user {
          username
        }
        description
        body
        imageURL
        category {
          category
        }
        tags {
          tag
        }
        createdAt
        updatedAt
    } 
}   
`

const GET_POST_BY_ID = gql`
query GetPostById($id: ID!){
  getPostById(_id: $id) {
        _id
        title
        user {
          username
        }
        description
        body
        imageURL
        category {
          category
        }
        tags {
          tag
        }
        createdAt
        updatedAt
    } 
}   
`

export {
  GET_POSTS,
  GET_POST_BY_ID
}
