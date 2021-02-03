import React from 'react'
import { useQuery, gql } from '@apollo/client'
import columns from './tags-column'
import { Table } from 'antd'

const GET_TAGS = gql`
query{
  getTags {
    tag,
    _id,
    posts {
      title
    }
  }
}
`

const Tag = () => {
  const { loading, error, data } = useQuery(GET_TAGS)

  if (loading) return <p>Loading...</p>
  if (error) throw new Error(error) // return `Error! ${error.message}`

  return (
        <div>
            <Table columns={columns} dataSource={data.getTags} scroll={{ x: 'max-content' }} />
        </div>

  )
}

export default Tag
