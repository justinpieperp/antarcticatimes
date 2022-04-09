import { gql } from '@apollo/client'

const CREATE_CATEGORY = gql`
    mutation CreateCategory($category: String!) {
        createCategory(category: $category) {
            category
        }
    }
`
const UPDATE_CATEGORY = gql`
    mutation UpdateCategory($id: ID!, $updateTo: String!) {
        updateCategory(_id: $id, updateTo: $updateTo) {
            category
        }
    }
`
const DELETE_CATEGORY = gql`
    mutation DeleteCategory($id: ID!) {
        deleteCategory(_id: $id) {
            category
        }
    }
`

export {
  CREATE_CATEGORY,
  UPDATE_CATEGORY,
  DELETE_CATEGORY
}
