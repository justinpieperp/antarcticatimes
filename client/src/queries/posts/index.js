// import React from 'react'
// import { useQuery, gql } from '@apollo/client'

import { gql } from '@apollo/client'

export const GET_POSTS = gql`
query getPosts {
    getPosts {  
        title
        author {
            username
        }
        description
        body
        image
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
// export default function Posts () {
//     const { loading, error, data } = useQuery(GET_POSTS)

//     if (loading) return <p>Loading...</p>
//     if (error) return <p>Error :(</p>

//     console.log(data)
//     const posts = data.getPosts

//     return (
//         <div>
//             {posts.map((post) => (
//                 <Post key={post.id} post={post} />
//             ))}
//         </div>

//     )
// }
