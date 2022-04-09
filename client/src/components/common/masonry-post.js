import moment from 'moment'
import React from 'react'
import { TagRow } from './'

function MasonryPost (props) {
    const post = props.post
    const backgroundImage = { backgroundImage: `url("${require(`../../assets/images/${post.imageURL}`)}")` }
    const windowWidth = window.innerWidth
    const style = windowWidth > 100 ? { ...backgroundImage, ...post.style } : backgroundImage

    const dateFormatter = (date) => { return moment(new Date(date).toISOString()).format('MMMM DD, YYYY') }
    return (
        <a className='masonry-post overlay'
            style={style}
        // href={post.link}
        >
            <div className='image-text' style={{ justifyContent: props.tagsOnTop ? 'space-between' : 'flex-end' }}>
                <TagRow tags={post.tags} />
                <div>
                    <p className='image-title'>{ post.title }</p>
                    <span className='image-date'> { dateFormatter(post.createdAt) }</span>
                </div>
            </div>
        </a>
    )
}

export default MasonryPost
