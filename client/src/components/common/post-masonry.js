import React from 'react'
import MasonryPost from './masonry-post'

export default function PostMasonry ({ posts, columns, tagsOnTop }) {
    return (
        <section className='masonry' style={{ gridTemplateColumns: `repeat(${columns}, minmax(275px, 1fr))` }}>
            { posts.map((post, index) =>
                <MasonryPost key = {index} post={post} tagsOnTop={tagsOnTop} />

            )}
        </section>
    )
}
