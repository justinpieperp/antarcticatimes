import React from 'react'
import NotFound from '../assets/svgs/page_not_found.svg'

const NotFoundPage = () => {
  return (
    <div className='container'>
        <p className='center'>Oops, something went wrong...</p>
        <div className='center'>
            <img className='center' src={NotFound} style={{ width: '50%' }} alt='not found' />
        </div>
    </div>
  )
}

export default NotFoundPage
