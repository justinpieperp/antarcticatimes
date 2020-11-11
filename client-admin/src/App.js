import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Dashboard, User, Post, Category, Tag } from './pages'
import { Sider, Header, Footer } from './layouts'
import { Layout } from 'antd'

function App () {
  const { Content } = Layout

  return (
    <Router>
      <div>
        <Layout className="layout-container">
          <Sider />
          <Layout className="site-layout">
            <Header />
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
            <Footer />
          </Layout>
        </Layout>
      </div>
    </Router>
  )
}

export default App
