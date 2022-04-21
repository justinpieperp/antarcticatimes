import React, { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Pagination } from 'antd'
import { TagRow } from './index'
import moment from 'moment'

export default function PostGrid ({ posts, size }) {
    const [pageSize, setPageSize] = useState(size)
    const [current, setCurrent] = useState(1)

    // useMemo: 在setPageSize或SetCurrent改变的情况下执行paginatedPosts
    // reduce unnecessary calculation
    const paginatedPosts = useMemo(() => {
        const lastIndex = pageSize * current
        const firstIndex = lastIndex - pageSize

        return posts.slice(firstIndex, lastIndex)
    }, [current, pageSize, posts])

    // make external effect when params changes
    // useEffect(() => {
    //     window.scroll({
    //         top: 400,
    //         left: 0,
    //         behavior: 'smooth'
    //     })
    // }, [current, pageSize])

    const dateFormatter = (date) => { return moment(new Date(date).toISOString()).format('MMMM DD, YYYY') }

    return (
        <section className="grid-pagination-container">
            <section className="post-grid container">
                {paginatedPosts.map((post, index) => (
                    <div key={index} className="post-container">
                        <figure>
                            {/* <Link to={`/post/${post?.id}`}> */}
                            <Link to={post.imageURL}>
                                <img src={require(`../../assets/images/${post.imageURL}`)} alt={post.imageURL}/>
                            </Link>
                        </figure>
                        <TagRow tags={post.tags} />
                        <h3>{post.title}</h3>
                        <p className="author-text">
                            <span>
                                By:
                                <Link to={post.user.username} >
                                    {post.user.username}
                                </Link>
                            </span>
                            <span>
                                - {dateFormatter(post.createdAt)}
                            </span>
                        </p>
                        <p className="description-text">
                            {post.description}
                        </p>
                        <Link to={post.imageURL}>Read More...</Link>
                    </div>
                ))}
            </section>

            <Pagination
                simple
                showSizeChanger
                onShowSizeChange={setPageSize}
                pageSize={pageSize}
                total={posts.length}
                defaultCurrent={current}
                onChange={setCurrent}
            />
        </section>
    )
}
