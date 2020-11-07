import React from 'react'
import Post from './post'

import { useQuery, gql } from '@apollo/client'

const GET_POSTS = gql`
query posts {
    getPosts {
        _id
        title
        author {
            username
        }
        category {
            category
        }
    } 
}    
`
export default function Posts () {
    const { loading, error, data } = useQuery(GET_POSTS)

    if (loading) return <p>Loading...</p>
    if (error) return <p>Error :(</p>

    console.log(data)
    const posts = data.getPosts

    return (
        <div>
            {posts.map((post) => (
                <Post key={post.id} post={post} />
            ))}
        </div>

    )
}
