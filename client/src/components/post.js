import React from 'react'

export default function Post ({ post }) {
    return (
        <div>
            <h1>{post._id}</h1>
            <h1>{post.title}</h1>
            <h2>{post.author.username}</h2>
            {/* <h1>{post.category.category}</h1> */}
        </div>
    )
}
