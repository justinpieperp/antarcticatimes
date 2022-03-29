import moment from 'moment'
import React from 'react'
import { TagRow } from './'

function MasonryPost ({ post, tagsOnTop }) {
    const backgroundImage = { backgroundImage: `url("${require(`../../assets/images/${post.image}`)}")` }
    const windowWidth = window.innerWidth
    const style = windowWidth > 900 ? { ...backgroundImage, ...post.style } : backgroundImage
    const dateFormatter = (date) => { return moment(new Date(date).toISOString()).format('MMMM DD, YYYY') }

    return (
        <a className='masonry-post overlay' style={style} href={post.link}>
            <div className='image-text' style={{ justifyContent: tagsOnTop ? 'space-between' : 'flex-end' }}>
                <TagRow tags={post.tags} />
                <div>
                    <h2 className='image-title'>{ post.title }</h2>
                    <span className='image-date'> { dateFormatter(post.createdAt) }</span>
                </div>
            </div>
        </a>
    )
}

export default MasonryPost
