import React from 'react'
import { Space, Tag } from 'antd'

const tagColors = [
  'magenta', 'red', 'volcano', 'orange', 'gold', 'lime', 'green', 'cyan', 'blue', 'geekblue', 'purple'
]

const columns = [
  {
    title: 'Title',
    dataIndex: 'title', // 列数据, 可嵌套查询
    key: 'title', // React 需要的 key, 如果设置了唯一的 dataIndex, 可忽略
    width: 168,
    fixed: true, // x方向scroll时保持该列不动
    // text: 当前行的值, record: 当前行的数据, index: 当前行索引
    // {text} === {record.title}
    render: function renderTitle (text, record, index) {
      return <a> {text} </a>
    }
  },
  {
    title: 'ID',
    dataIndex: '_id',
    key: '_id',
    width: 272
  },
  {
    title: 'Author',
    dataIndex: ['author', 'username'],
    key: 'author.username',
    width: 168

  },
  {
    title: 'Category',
    dataIndex: ['category', 'category'],
    key: 'category',
    width: 168
  },
  {
    title: 'Tags',
    dataIndex: 'tags', // ['tags', 'tag'],
    render: function renderTags (tags) {
      return <span>
        {tags.map(e => {
          // const color = tagColors[Math.floor(Math.random() * e.tag.length)]
          const color = tagColors[tags.indexOf(e)]
          return (
            <Tag color={color} key={e.tag}>
              {e.tag.toUpperCase()}
            </Tag>
          )
        })}
      </span>
    },
    key: 'tags',
    width: 272
  },
  {
    title: 'Created',
    dataIndex: 'createdAt',
    key: 'createdAt',
    width: 168,
    render: function ID (text) {
      return <div>{new Date(text).toDateString()}</div>
    }
  },
  {
    title: 'Updated',
    dataIndex: 'updatedAt',
    key: 'updatedAt',
    width: 168,
    ellipsis: true,
    render: function ID (text) {
      const date = new Date(text)
      return <div>{date.toDateString()}</div>
    }
  },
  {
    title: 'Body',
    dataIndex: 'body',
    key: 'body',
    width: 272,
    ellipsis: true
  },
  // Actions
  {
    title: 'Action',
    key: 'action',
    width: 104,
    render: function renderAction (text, record) {
      return (
        <Space size="middle">
          <a>Edit</a>
          <a>Delete</a>
        </Space>
      )
    }
  }
]

export default columns
