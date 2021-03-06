import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Space, Button, Layout, Input } from 'antd'
import { SearchOutlined, HomeOutlined, UserOutlined } from '@ant-design/icons'

// import { LoginForm } from '../pages'

const Header = () => {
  const [searchInput, showSearchInput] = useState(false)
  const setInput = () => showSearchInput(!searchInput)

  return (
    <Layout.Header className="header-container">
        <Space className="header-toolbar">
             <Button type="text" shape="circle" onClick={setInput} icon={<SearchOutlined />} />
            { searchInput
              ? <Input placeholder="input with clear icon" allowClear bordered={false}
                    style={{ borderBottom: 'solid 1px' }}/>
              : null }
            <Button type="text" shape="circle" icon={<HomeOutlined />} />
            <Button type="text" shape="circle" icon={<UserOutlined />}>
              <Link to='/login' />
            </Button>
        </Space>
    </Layout.Header>
  )
}

export default Header

// 搜索框怎么缓慢出现? 用css transition不管用
// button的hover color不好看

// space: size={size}
// align 对齐方式 start | end |center |baseline
// direction 间距方向 vertical | horizontal default=horizontal
// size间距大小 small | middle | large | number default=small
// split 设置拆分 ReactNode
