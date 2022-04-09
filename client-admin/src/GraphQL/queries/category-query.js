import { gql } from '@apollo/client'

const GET_CATEGORIES = gql`
query{
  getCategories {
    category,
    _id,
    posts {
      title
    }
  }
}
`

const GET_CATEGORY_BY_ID = gql`
query GetCategoryById($id: ID!) {
  getCategoryById(_id: $id) {
    category,
    _id,
    posts {
      title
    }
  }
}
`

export {
  GET_CATEGORIES,
  GET_CATEGORY_BY_ID
}
