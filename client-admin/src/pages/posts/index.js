import React from 'react'
import { Table, Button, Space } from 'antd'
import { useQuery, gql } from '@apollo/client'
import columns from './posts-column'
import { PlusOutlined } from '@ant-design/icons'

const GET_POSTS = gql`
query {
    getPosts {
        _id
        title
        author {
          username
        }
        body
        category {
          category
        }
        tags {
          tag
        }
        createdAt
        updatedAt
    } 
}   
`

const Post = () => {
  const { loading, error, data } = useQuery(GET_POSTS)

  if (loading) return <p>Loading...</p>
  if (error) throw new Error(error) // return `Error! ${error.message}`

  console.log(data)

  return (
  <div>
    <Space className='table-toolbar'>
      <Button type="primary" icon={<PlusOutlined />}>Add</Button>
      <Button type="primary" icon={<PlusOutlined />}>undecided</Button>
      <Button type="primary" icon={<PlusOutlined />}>undecided</Button>
    </Space>

    <Table
      columns={columns}
      dataSource={data.getPosts}
      // x方向的滚动条，max-content使横向展开到最大
      scroll={{ x: 'max-content' }}
      // Default position: 'bottomRight', pageSize: '10'
      // pagination={{ position: 'bottomRight', pageSize: '7' }}
    />
  </div>

  )
}

export default Post
