import React from 'react'
import { Button, Space } from 'antd'
import { PlusOutlined } from '@ant-design/icons'

const TableToolbar = (args) => {
  return (
    <Space className='table-toolbar'>
      <span className='title'>{args.title}</span>
      {args.showAddButton
        ? <Button type="primary"
      icon={<PlusOutlined />}
      htmlType="button"
      href={args.path}
      >
    Add</Button>
        : ''
    }

    </Space>
  )
}

export default TableToolbar
