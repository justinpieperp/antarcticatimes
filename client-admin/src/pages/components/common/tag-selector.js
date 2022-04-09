import React, { useState } from 'react'
import { Input, Select, Divider, Typography, Space } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import TagRender from './tag-render'

const TagSelector = (props) => {
  const { Option } = Select
  const allTags = props.allTags.map(tag => { return tag.tag })

  const [items, setItems] = useState([])
  const [name, setName] = useState('')

  const handleChange = (value) => {
    props.setSelectedTags(value)
  }

  const onNameChange = event => {
    setName(event.target.value)
  }

  const addItem = e => {
    e.preventDefault()
    setItems([...items, name])
    setName('')
  }

  return (
    <Select mode="multiple"
      placeholder="Please select tags"
      showArrow
      tagRender={ TagRender }
      onChange={handleChange}
      defaultValue={props.defaultValue}
      dropdownRender={menu => (
        <>
          {menu}
          <Divider style={{ margin: '8px 0' }} />
          <Space align="center" style={{ padding: '0 8px 4px' }}>
            <Input placeholder="Please enter new tag name" value={name} onChange={onNameChange} />
            <Typography.Link onClick={addItem} style={{ whiteSpace: 'nowrap' }}>
              <PlusOutlined /> Add item
            </Typography.Link>
          </Space>
        </>
      )}
      >
        {[...allTags, ...items].map((tag, index) => (
          <Option value={tag} key={index}>{tag}</Option>
        ))}
    </Select>
  )
}

export default TagSelector
