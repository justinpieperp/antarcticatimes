import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import { Layout } from 'antd'
import Sider from './layouts/sider'
import { Dashboard, User, Post, Category, Tag } from './pages'

function App () {
  const { Header, Footer, Content } = Layout

  return (
    <Router>
      <div>
        <Layout className="layout-container">
          <Sider />

          <Layout className="site-layout">
            <Header className="header-layout">
            </Header>

            <Content className="content-layout">
              <Switch>
                <Route path="/" exact component={Dashboard} />
                <Route path="/dashboard" component={Dashboard} />
                <Route path="/user" component={User} />
                <Route path="/post" component={Post} />
                <Route path="/category" component={Category} />
                <Route path="/tag" component={Tag} />
              </Switch>
            </Content>

            <Footer className="footer-layout">Footer</Footer>
          </Layout>
        </Layout>
      </div>
    </Router>

  )
}

export default App
