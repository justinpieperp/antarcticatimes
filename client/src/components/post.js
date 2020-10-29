import React from 'react'

export default function Post ({ post }) {
    return (
        <div>
            <h1>{post.title}</h1>
            <a href={post.link}>click</a>
            <span>{post.categories}</span>
            <span>{post.date}</span>
            <span>{post.image}</span>
        </div>
    )
}
