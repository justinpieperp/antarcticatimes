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
  const toggleCollapsed = () => setCollapsed(!collapsed)

  return (
        <Layout.Sider className="sider-layout" width={272} trigger={null} collapsedWidth={80} collapsible collapsed={collapsed}>
          <div className="logo">Penguin Swing</div>
            <Button className="trigger" type={'link'} onClick={toggleCollapsed} >
                {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined)}
            </Button>
          <Menu
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            mode="inline"
            theme="dark"
            inlineCollapsed={collapsed}>
          <Menu.Item key="1" icon={<PieChartOutlined />}>
            <Link to='/'>Dashboard</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<DesktopOutlined />}>
            <Link to='/user'>Users</Link>
          </Menu.Item>
          <Menu.Item key="3" icon={<ContainerOutlined />}>
            <Link to='/post'>Posts</Link>
          </Menu.Item>
          <Menu.Item key="4" icon={<ContainerOutlined />}>
            <Link to='/category'>Categories</Link>
          </Menu.Item>
          {/* <Menu.Item key="5" icon={<ContainerOutlined />}>
            <Link to='/tags'>Tags</Link>
          </Menu.Item> */}
          <SubMenu key="sub1" icon={<MailOutlined />} title="tags">
            <Menu.Item key="sub1-1" icon={<ContainerOutlined />}>
              <Link to='/tags'>Tag List</Link>
            </Menu.Item>
            <Menu.Item key="sub1-2" icon={<ContainerOutlined />}>
              <Link to='/tag/create'>Create New Tag</Link>
            </Menu.Item>
          </SubMenu>
          {/* <SubMenu key="sub2" icon={<AppstoreOutlined />} title="Navigation Two">
            <Menu.Item key="9">Option 9</Menu.Item>
            <Menu.Item key="10">Option 10</Menu.Item>
            <SubMenu key="sub3" title="Submenu">
              <Menu.Item key="11">Option 11</Menu.Item>
              <Menu.Item key="12">Option 12</Menu.Item>
            </SubMenu>
           </SubMenu> */}
          </Menu>
        </Layout.Sider>
  )
}

export default Sider
