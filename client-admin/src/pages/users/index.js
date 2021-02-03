import React from 'react'
import { useQuery, gql } from '@apollo/client'
import columns from './users-column'
import { Table } from 'antd'

const GET_USERS = gql`
query{
  getUsers {
    email,
    _id,
    username,
    posts {
      title
    }
  }
}
`

const User = () => {
  const { loading, error, data } = useQuery(GET_USERS)

  if (loading) return <p>Loading...</p>
  if (error) throw new Error(error) // return `Error! ${error.message}`

  return (
        <div>
            <Table columns={columns} dataSource={data.getUsers} scroll={{ x: 'max-content' }} />
        </div>

  )
}

export default User
