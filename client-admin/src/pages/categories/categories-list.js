import React from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { Table, Space, Button, Spin } from 'antd'
import { TableToolbar } from '../../layouts'
import { GET_CATEGORIES } from '../../GraphQL/queries'
import { DELETE_CATEGORY } from '../../GraphQL/mutations'
import { useHistory } from 'react-router-dom'
import { capitalizedString } from '../components/_methods'
import { triggerErrorModal, triggerSuccessModal } from '../components/common'

const CategoryList = () => {
  const history = useHistory()
  const height = window.innerHeight - 300
  const { loading, data, refetch } = useQuery(GET_CATEGORIES, { fetchPolicy: 'cache-and-network' })
  const [deleteCategory, { error, reset }] = useMutation(DELETE_CATEGORY, {
    onCompleted: () => triggerSuccessModal(refetch)
  })

  if (loading) return <div className='container center'><Spin tip="Loading..." /></div>
  if (error) triggerErrorModal(error, reset)

  const clickEditButton = id => {
    history.push(`/category/detail/${id}`)
  }

  const clickDeleteButton = (id) => {
    deleteCategory({
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
      title: 'Category',
      dataIndex: 'category',
      width: 168,
      fixed: true,
      render: function (category) {
        return capitalizedString(category)
      }
    },
    {
      title: 'ID',
      dataIndex: '_id',
      width: 168
    },
    {
      title: 'Posts',
      dataIndex: 'posts',
      render: function renderTags (posts) {
        const postsList = posts.map(e =>
          <li key={e._id}> {e.title} </li>
        )
        return <ol>{postsList}</ol>
      }
    },
    {
      title: 'Action',
      key: 'action',
      render: function renderAction (_, record) {
        return (
          <Space size='middle'>
            <Button type='link' onClick={() => clickEditButton(record._id)}>EDIT</Button>
            <Button type='link' onClick={() => clickDeleteButton(record._id) }>DELETE</Button>
          </Space>
        )
      }
    }
  ]

  return (
    <div className='container'>
      <TableToolbar
        path={'/category/create'}
        title={'Category List'}
        showAddButton={true}
        />
          <Table columns={columns} dataSource={data.getCategories} scroll={{ x: 'max-content', y: height }} />
        </div>
  )
}

export default CategoryList
