import React from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { Table, Space, Button, Spin } from 'antd'
import { TableToolbar } from '../../layouts'
import { GET_USERS } from '../../GraphQL/queries'
import { DELETE_USER } from '../../GraphQL/mutations'
import { useNavigate } from 'react-router-dom'
import { triggerErrorModal, triggerSuccessModal } from '../components/common'

const UserList = () => {
  const navigate = useNavigate()
  const height = window.innerHeight - 300
  const userQuery = useQuery(GET_USERS, { fetchPolicy: 'cache-and-network' })
  const [deleteUser, { error, reset }] = useMutation(DELETE_USER, {
    onCompleted: () => triggerSuccessModal(userQuery.refetch)
  })

  if (userQuery.loading) return <div className='container center'><Spin tip="Loading..." /></div>
  if (userQuery.error) return triggerErrorModal(userQuery.error, userQuery.refetch)
  if (error) return triggerErrorModal(error, reset)

  const clickEditButton = (id) => {
    navigate(`${id}/edit`)
  }

  const clickDeleteButton = (id) => {
    deleteUser({
      variables: {
        id: id
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
      title: 'Username',
      dataIndex: 'username',
      width: 168,
      fixed: true
    },
    {
      title: 'Email',
      dataIndex: 'email',
      width: 168,
      ellipsis: true
    },
    {
      title: 'ID',
      dataIndex: '_id',
      width: 168
    },

    {
      title: 'Posts',
      dataIndex: 'posts',
      render: function renderPosts (posts) {
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
        path={'/users/create'}
        title={'User List'}
        showAddButton={true}
        />
      <Table columns={columns} dataSource={userQuery.data.getUsers} scroll={{ x: 'max-content', y: height }} />
    </div>
  )
}

export default UserList
