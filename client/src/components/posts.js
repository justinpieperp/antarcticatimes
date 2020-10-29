import React from 'react'
import Post from './post'

export default function Posts ({ posts }) {
    return (
        <div>
            {posts.map((post) => (
                <Post key={post.id} post={post} />
            ))}
        </div>
    )
}
