import React from 'react'
import { Button, Space } from 'antd'
import { PlusOutlined } from '@ant-design/icons'

const TableToolbar = () => {
  return (
    <Space className='table-toolbar'>
      <Button type="primary" icon={<PlusOutlined />}>Add</Button>
    </Space>
  )
}

export default TableToolbar
