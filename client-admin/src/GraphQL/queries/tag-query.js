import { gql } from '@apollo/client'

const GET_TAGS = gql`
query{
  getTags {
    tag,
    _id,
    posts {
      title
    }
  }
}
`

const GET_TAG_BY_ID = gql`
query GetTagById($_id: ID!){ 
  getTagById(_id: $_id) {
    tag,
    _id,
    posts {
      title
    }
  }
}
`

const GET_TAG_BY_NAME = gql`
query GetTagByName($tag: String!){ 
  getTagByName(tag: $tag) {
    tag,
    _id,
    posts {
      title
    }
  }
}
`

export {
  GET_TAGS,
  GET_TAG_BY_NAME,
  GET_TAG_BY_ID
}
