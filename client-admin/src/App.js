import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Dashboard, User, Post, Category, Tags, Login, CreateTag } from './pages'
import { Sider, Header, Footer, TableToolbar } from './layouts'
import { Layout } from 'antd'

function App () {
  const { Content } = Layout

  return (
    <Router>
      <div>
      <Switch>
      <Route path="/login" component={Login}/>
        <Layout className="layout-container">
          <Sider />
          <Layout className="site-layout">
            <Header />
            <Content className="content-layout">
              <TableToolbar />
                <Route path="/" exact component={Dashboard} />
                <Route path="/dashboard" component={Dashboard} />
                <Route path="/user" component={User} />
                <Route path="/post" component={Post} />
                <Route path="/category" component={Category} />
                <Route path="/tags" component={Tags} />
                <Route path="/tag/create" component={CreateTag} />

              </Content>
            <Footer />
          </Layout>
        </Layout>
        </Switch>
      </div>
    </Router>
  )
}

export default App
