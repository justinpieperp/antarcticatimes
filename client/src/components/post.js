import React from 'react'

export default function Post ({ post }) {
    return (
        <div>
            <h1>{post.title}</h1>
            <h2>{post.author}</h2>
        </div>
    )
}
