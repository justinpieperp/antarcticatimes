import { gql } from '@apollo/client'

const GET_POSTS = gql`
query getPosts {
    getPosts {  
        title
        user {
            username
        }
        description
        body
        imageURL
        createdAt
        category {
            category
        }
        tags{
            tag
        }
    } 
}    
`

const GET_POST_SORT_BY_DATE = gql`
query GetPostSortByDate {
    getPostSortByDate {  
        title
        user {
            username
        }
        description
        body
        imageURL
        createdAt
        category {
            category
        }
        tags{
            tag
        }
    } 
}    
`

export {
    GET_POSTS,
    GET_POST_SORT_BY_DATE
}
