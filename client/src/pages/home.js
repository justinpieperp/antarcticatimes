import React from 'react'
import { useQuery } from '@apollo/client'
import { Spin } from 'antd'
import { PostMasonry, PostGrid, MasonryPost } from '../components/common'
import { GET_POSTS, GET_POST_SORT_BY_DATE } from '../queries/posts'
import { trendingConfig, featuredConfig } from '../components/styles'

const Home = () => {
    const allPostsQuery = useQuery(GET_POSTS)
    const recentPostsQuery = useQuery(GET_POST_SORT_BY_DATE)
    if (allPostsQuery.loading || recentPostsQuery.loading) return <Spin className='center' tip="Loading..." />
    if (allPostsQuery.error) return new Error(allPostsQuery.error)
    if (recentPostsQuery.error) return new Error(recentPostsQuery.error)

    const allPosts = allPostsQuery.data.getPosts
    const recentPosts = recentPostsQuery.data.getPostSortByDate
    const featuredPosts = allPosts.slice(0, 8)
    const trendingPosts = allPosts.slice(0, 4)

    const styledTrendingPosts = trendingPosts.map((post, index) => (
        { ...post, style: trendingConfig[index] }
    ))
    const lastTrending = styledTrendingPosts.pop()

    const styledFeaturedPosts = featuredPosts.map((post, index) => (
        { ...post, style: featuredConfig[index] }
    ))

    return (
        <main className='home'>
            <section className='container'>
                <div className='row'>
                    <h2>Trending Posts</h2>
                    <div className='trending-posts-container'>
                        <PostMasonry posts={styledTrendingPosts} columns={2} tagsOnTop={true} />
                        <MasonryPost post={lastTrending} tagsOnTop={true} />
                    </div>
                </div>
            </section>

            <section className="bg-white">
                <section className="container">
                    <div className="row">
                        <h2>Recent Posts</h2>
                        <PostGrid posts={recentPosts} />
                    </div>
                </section>
            </section>

            <section className="container">
                <div className="row">
                    <h2>Featured Posts</h2>
                    <PostMasonry posts={styledFeaturedPosts} columns={3}/>
                </div>
            </section>
        </main>
    )
}

export default Home
