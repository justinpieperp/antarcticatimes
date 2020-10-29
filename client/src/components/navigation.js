import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { MenuOutlined, CloseOutlined, UserOutlined, SearchOutlined } from '@ant-design/icons'
import { Button, Tooltip } from 'antd'

const navLinks = [
    {
        title: 'HOME',
        path: '/'
    },
    {
        title: 'BLOG',
        path: '/blog'
    },
    {
        title: 'ABOUT',
        path: '/about'
    }
]

export default function Navigation () {
    const [sidebarActive, setSidebarActive] = useState(false)
    const showSidebar = () => setSidebarActive(!sidebarActive)

    return (
        <nav className="nav-container">

            <div className="logo-container">
                <i className="nav-icon" onClick={showSidebar}><MenuOutlined /></i>
                <span className="nav-logo">PenguinSwing</span>
            </div>

            {/* <div className={sidebarActive ? "menu-container active" : "menu-container"}> */}
            <div className={`menu-container ${sidebarActive && 'active'}`}>
                <div className="menu-close"><CloseOutlined style={{ fontSize: '25px' }} onClick={showSidebar} /></div>
                <ul onClick={sidebarActive ? showSidebar : null}>
                    { navLinks.map((link, index) =>
                        <li key={index}><Link to={link.path}> {link.title}</Link>  </li>
                    )}
                </ul>

                <div className="menu-search">
                    <Tooltip title="search">
                        <Button shape="circle" icon={<SearchOutlined />} />
                    </Tooltip>
                </div>

                <div className="menu-user">
                    <Button icon={ <UserOutlined /> }>
                        <Link to='/signin'></Link>
                    </Button>
                </div>

            </div>
        </nav>
    )
}
