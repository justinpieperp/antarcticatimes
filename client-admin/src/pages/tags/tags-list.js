import React from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { Table, Space, Button } from 'antd'
// import columns from './tags-column'
import { GET_TAGS } from '../../GraphQL/queries'
import { DELETE_TAG } from '../../GraphQL/mutations'

const Tags = () => {
  const { loading, error, data, refetch } = useQuery(GET_TAGS)
  const [deleteTag, { err }] = useMutation(DELETE_TAG)
  const removeTag = (tag) => {
    deleteTag({
      variables: {
        tag: tag
      }
    })
  }

  if (loading) return <p>Loading...</p>
  if (error) throw new Error(error)
  if (err) throw new Error(err)

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
        const postsList = posts.map(post =>
          <li key={post._id}> {post.title} </li>
        )
        return <ol>{postsList}</ol>
      }
    },
    {
      title: 'Action',
      key: 'action',
      render: function renderAction (text, record) {
        return (
          <Space size="middle">
            <Button>Edit</Button>
            <Button onClick={ async function () { await removeTag(record.tag) refetch()}}>Delete</Button>
          </Space>
        )
      }
    }
  ]

  return (
        <div>
            <Table columns={columns} dataSource={data.getTags} scroll={{ x: 'max-content' }} />
        </div>

  )
}

export default Tags
