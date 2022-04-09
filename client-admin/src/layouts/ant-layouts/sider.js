import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu, Button, Layout } from 'antd'
import {
  // AppstoreOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  PieChartOutlined,
  DesktopOutlined,
  ContainerOutlined,
  MailOutlined
} from '@ant-design/icons'

const Sider = () => {
  const { SubMenu } = Menu

  const [collapsed, setCollapsed] = useState(false)
  const toggleCollapsed = () => {
    setCollapsed(!collapsed)
  }

  return (
        <Layout.Sider className="sider-container" width={260} trigger={null} collapsedWidth={54} collapsible collapsed={collapsed}>
          <div className="title">
            <Button className="trigger" type={'link'} onClick={toggleCollapsed} >
                {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined)}
            </Button>
            <span>{collapsed ? '' : 'Antarctica Times'.toUpperCase()}</span>
          </div>

          <Menu
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            mode="inline"
            theme="dark"
          >
          <Menu.Item key="1" icon={<PieChartOutlined />}>
            <Link to='/'>Dashboard</Link>
          </Menu.Item>

          <SubMenu key="sub1" icon={<MailOutlined />} title="Posts">
            <Menu.Item key="11" icon={<ContainerOutlined />}>
              <Link to='/posts'>Post List</Link>
            </Menu.Item>
            <Menu.Item key="12" icon={<ContainerOutlined />}>
              <Link to='/post/create'>Create New Post</Link>
            </Menu.Item>
          </SubMenu>

          <SubMenu key="sub2" icon={<DesktopOutlined />} title="Users">
            <Menu.Item key="21" icon={<ContainerOutlined />}>
              <Link to='/users'>User List</Link>
            </Menu.Item>
            <Menu.Item key="22" icon={<ContainerOutlined />}>
              <Link to='/user/create'>Create New User</Link>
            </Menu.Item>
          </SubMenu>

          <SubMenu key="sub3" icon={<MailOutlined />} title="Categories">
            <Menu.Item key="31" icon={<ContainerOutlined />}>
              <Link to='/categories'>Category List</Link>
            </Menu.Item>
            <Menu.Item key="32" icon={<ContainerOutlined />}>
              <Link to='/category/create'>Create New Category</Link>
            </Menu.Item>
          </SubMenu>

          <SubMenu key="sub4" icon={<MailOutlined />} title="Tags">
            <Menu.Item key="41" icon={<ContainerOutlined />}>
              <Link to='/tags'>Tag List</Link>
            </Menu.Item>
            <Menu.Item key="42" icon={<ContainerOutlined />}>
              <Link to='/tag/create'>Create New Tag</Link>
            </Menu.Item>
          </SubMenu>

          </Menu>
        </Layout.Sider>
  )
}

export default Sider
