import React from 'react'

const columns = [
  {
    title: 'Tag',
    dataIndex: 'tag', // 列数据, 可嵌套查询
    key: 'tag', // React 需要的 key, 如果设置了唯一的 dataIndex, 可忽略
    width: 168,
    fixed: true
  },
  {
    title: 'ID',
    dataIndex: '_id',
    key: '_id',
    width: 272
  },
  {
    title: 'Posts',
    dataIndex: 'posts',
    // key: 'posts.title',
    render: function renderTags (posts) {
      const postsList = posts.map(e =>
        <li key={e._id}> {e.title} </li>
      )
      return <ol>{postsList}</ol>
    }
  }
]

export default columns
