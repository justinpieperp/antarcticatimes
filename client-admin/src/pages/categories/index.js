import React from 'react'
import { useQuery, gql } from '@apollo/client'
import columns from './categories-column'
import { Table } from 'antd'

const GET_CATEGORIES = gql`
query{
  getCategories {
    category,
    _id,
    posts {
      title
    }
  }
}
`

const Category = () => {
  const { loading, error, data } = useQuery(GET_CATEGORIES)

  if (loading) return <p>Loading...</p>
  if (error) throw new Error(error) // return `Error! ${error.message}`

  return (
        <div>
            <Table columns={columns} dataSource={data.getCategories} scroll={{ x: 'max-content' }} />
        </div>

  )
}

export default Category
