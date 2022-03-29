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

const GET_TAGS_BY_ID = gql`
query getTagsById($id: ID!){ 
  getTags(_id: $id) {
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
  GET_TAGS_BY_ID
}
