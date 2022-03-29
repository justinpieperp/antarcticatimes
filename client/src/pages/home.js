import React from 'react'
import { MasonryPost, PostMasonry, PostGrid } from '../components/common'
import { useQuery } from '@apollo/client'
import { GET_POSTS } from '../queries/posts'

// const featuredConfig = {
//     0: {
//         gridArea: '1 / 1 / 2 / 3',
//         height: '300px'
//     },
//     1: {
//         height: '300px'
//     },
//     3: {
//         height: '630px',
//         marginLeft: '30px',
//         width: '630px'
//     }
// }

// const trendingConfig = {
//     1: {
//         gridArea: ' 1 / 2 / 3 / 3'
//     }
// }

// function addStyle (data) {
//     const posts = [...data]
//     posts.map((post, index) => {
//         post.style = featuredConfig[index]
//     })
//     return posts
// }

// const mergeStyles = function (posts, config) {
//     posts.forEach((post, index) => {
//         post.style = config[index]
//     })
// }

// const recentPosts = [...trending, ...featured, ...featured]

function Home () {
    const { loading, error, data } = useQuery(GET_POSTS)
    if (loading) return <p>Loading ...</p>
    if (error) return new Error(error)

    const posts = data.getPosts
    const featured = [...posts.slice(0, 4)]

    // const styledFeatured = useMemo(() => {
    //     return addStyle(featured)
    // }, [addStyle, featured])
    // const styledFeatured = addStyle(featured)

    // mergeStyles([...featured], featuredConfig)
    const lastFeatured = featured.pop()

    // mergeStyles(trending, trendingConfig)

    return (
        <main className='home'>
            <section className='container'>
                <div className='row'>
                    <div className='featured-posts-container'>
                        <PostMasonry posts={featured} columns={2} tagsOnTop={true} />
                        <MasonryPost post={lastFeatured} tagsOnTop={true} />
                    </div>
                </div>
            </section>

            <section className="bg-white">
                <section className="container">
                    <div className="row">
                        <h1>Recent Posts</h1>
                        <PostGrid posts={posts} />
                    </div>
                </section>
            </section>

            <section className="container">
                <div className="row">
                    <PostMasonry posts={posts} columns={3}/>
                </div>
            </section>
        </main>

    )
}

export default Home
