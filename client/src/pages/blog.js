import React from 'react'
import posts from '../assets/mocks/posts'
import Posts from '../components/posts'

export default function Blog () {
    return (
        <div>
            <h1>BLOG</h1>
            <Posts posts={posts} />
        </div>
    )
}
