import React, { Suspense } from 'react'
import { useQuery } from '@apollo/client'
import { GET_POSTS } from '../queries/posts'
// import { PostGrid } from '../components/common'
import { Spin } from 'antd'

const PostGrid = React.lazy(() => import('../components/common/post-grid'))

function Posts () {
    const { loading, error, data } = useQuery(GET_POSTS)
    if (loading) return <div className='container center'><Spin tip="Loading..." /></div>
    if (error) return new Error(error)
    const allPosts = data.getPosts

    return (
        <Suspense fallback={<div style={{ fontSize: '100px' }}>Loading...</div>}>
            <main className='home'>
                <section className="container">
                    <div className="row">
                        <h2>Recent Posts</h2>
                        <PostGrid posts={allPosts} size={12} />
                    </div>
                </section>
            </main>
        </Suspense>
    )
}

export default Posts
