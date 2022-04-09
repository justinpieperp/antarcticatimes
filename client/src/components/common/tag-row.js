import React from 'react'
import { tagColors } from '../styles'

export default function TagRow ({ tags }) {
    return (
        <div className='tags-container'>
            { tags.map((tag, index) => (
                <span key={index}
                    className='tag'
                    style={{ backgroundColor: tagColors[tag.tag.toUpperCase()] }}>
                    { tag.tag.toUpperCase() }
                </span>
            ))}
        </div>
    )
}
