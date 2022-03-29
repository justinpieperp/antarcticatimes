import { gql } from '@apollo/client'

const CREATE_TAG = gql`
mutation createTag($tag: String!) {
    createTag(tag: $tag) {
        tag
    }
}
`

const UPDATE_TAG = gql`
mutation updateTag($tag: String, $updateTo: String) {
    updateTag(tag: $updateTo) {
        tag
    }
}
`

const DELETE_TAG = gql`
mutation deleteTag($tag: String!) {
    deleteTag(tag: $tag) {
       tag
    }
}
`
export {
  CREATE_TAG,
  UPDATE_TAG,
  DELETE_TAG
}
