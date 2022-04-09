import React from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { Table, Space, Button, Spin } from 'antd'
import { TableToolbar } from '../../layouts'
import { GET_POSTS } from '../../GraphQL/queries'
import { DELETE_POST } from '../../GraphQL/mutations'
import { useHistory } from 'react-router-dom'
import { triggerErrorModal, triggerSuccessModal, TagRender } from '../components/common'

const PostList = () => {
  const history = useHistory()
  const postsQuery = useQuery(GET_POSTS, { fetchPolicy: 'cache-and-network' })
  const [deletePost, { error, reset }] = useMutation(DELETE_POST, {
    onCompleted: () => triggerSuccessModal(postsQuery.refetch)
  })

  if (postsQuery.loading || deletePost.loading) return <Spin className='center' tip="Loading..." />
  if (postsQuery.error) console.log(postsQuery.error)
  if (error) triggerErrorModal(deletePost.error, reset)

  const posts = postsQuery.data.getPosts

  const clickEditButton = (id) => {
    history.push(`/post/detail/${id}`)
  }

  const clickDeleteButton = (id) => {
    deletePost({
      variables: {
        id
      }
    })
  }

  const columns = [
    {
      title: '#',
      key: 'index',
      render: (text, record, index) => index + 1,
      fixed: true
    },
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
      title: 'Action',
      key: 'action',
      fixed: true,
      render: function renderAction (_, record) {
        return (
          <Space size='middle'>
            <Button type='link' onClick={() => clickEditButton(record._id)}>EDIT</Button>
            <Button type='link' onClick={() => clickDeleteButton(record._id) }>DELETE</Button>
          </Space>
        )
      }
    },
    {
      title: 'ID',
      dataIndex: '_id',
      key: '_id',
      width: 272
    },
    {
      title: 'User',
      dataIndex: ['user', 'username'],
      key: 'user.username',
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
      dataIndex: 'tags',
      render: function renderTags (tags) {
        return <span>
          {tags.map((tag, index) => {
            return (
              <TagRender value={tag.tag} label={tag.tag.toUpperCase()} closable={false} key={index} />
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
      defaultSortOrder: 'ascend',
      sorter: (a, b) => a.updatedAt - b.updatedAt,
      sortDirections: ['ascend', 'descend', 'ascend'],
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
    }
  ]

  return (
  <div className='container'>
    <TableToolbar
        path={'/post/create'}
        title={'Post List'}
        showAddButton={true}
        />
    <Table
      columns={columns}
      dataSource={posts}
      scroll={{ x: 'max-content' }}
      // Default position: 'bottomRight', pageSize: '10'
      // pagination={{ position: 'bottomRight', pageSize: '7' }}
      />
  </div>

  )
}

export default PostList
