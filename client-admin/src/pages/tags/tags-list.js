import React from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { Table, Space, Button, Spin } from 'antd'
import { GET_TAGS } from '../../GraphQL/queries'
import { DELETE_TAG } from '../../GraphQL/mutations'
import { TableToolbar } from '../../layouts'
import { useHistory } from 'react-router-dom'
import { triggerErrorModal, triggerSuccessModal } from '../components/common'

const TagList = () => {
  const history = useHistory()
  const tagsQuery = useQuery(GET_TAGS, { fetchPolicy: 'cache-and-network' })
  const [deleteTag, { error, reset }] = useMutation(DELETE_TAG, {
    onCompleted: () => {
      triggerSuccessModal(tagsQuery.refetch)
    }
  })

  if (tagsQuery.loading) return <div className='container center'><Spin tip="Loading..." /></div>
  if (tagsQuery.error) return triggerErrorModal(tagsQuery.error)
  if (error) return triggerErrorModal(error, reset)

  const tagsData = tagsQuery.data.getTags

  const clickEditButton = async (id) => {
    history.push(`/tag/detail/${id}`)
  }
  const clickDeleteButton = (tag) => {
    deleteTag({
      variables: {
        tag: tag
      }
    })
  }

  const height = window.innerHeight - 300

  const columns = [
    {
      title: '#',
      key: 'index',
      render: (text, record, index) => index + 1,
      fixed: true
    },
    {
      title: 'Tag',
      dataIndex: 'tag', // 列数据, 可嵌套查询
      key: 'tag', // React 需要的 key, 如果设置了唯一的 dataIndex, 可忽略
      // width: 168,
      fixed: true
    },
    {
      title: 'ID',
      dataIndex: '_id',
      key: '_id'
      // width: 168
    },
    {
      title: 'Posts',
      dataIndex: 'posts',
      render: function renderTags (posts) {
        const postsList = posts.map((post) => {
          return (
            <li key={post._id}> {post.title} </li>
          )
        })
        return <ol>{postsList}</ol>
      }
    },
    {
      title: 'Action',
      key: 'action',
      render: function renderAction (text, record) {
        return (
          <Space size='small'>
            <Button type='link' onClick={() => clickEditButton(record._id)}>EDIT</Button>
            <Button type='link' onClick={(e) => clickDeleteButton(record.tag) }>DELETE</Button>
          </Space>
        )
      }
    }
  ]

  return (
    <div className='container'>
      <TableToolbar
        path={'/tag/create'}
        title={'Tag List'}
        showAddButton={true}
        />
          <Table columns={columns} dataSource={tagsData} scroll={{ x: 'max-content', y: height }} />
        </div>
  )
}

export default TagList
