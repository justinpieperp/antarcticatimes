import React from 'react'
import { useQuery } from '@apollo/client'
import { GET_POSTS } from '../queries/posts'
import { PostGrid } from '../components/common'
import { Spin } from 'antd'

function Posts () {
    const { loading, error, data } = useQuery(GET_POSTS)
    if (loading) return <Spin className='center' tip="Loading..." />
    if (error) return new Error(error)
    const allPosts = data.getPosts

    return (
        <main className='home'>
            <section className="bg-white">
                <section className="container">
                    <div className="row">
                        <h2>Recent Posts</h2>
                        <PostGrid posts={allPosts} />
                    </div>
                </section>
            </section>
        </main>
    )
}

export default Posts
