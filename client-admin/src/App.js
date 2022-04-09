import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Dashboard from './pages/dashboard'
import Login from './pages/login'
import { PostList, CreatePost, PostDetail } from './pages/posts'
import { UserList, CreateUser, UserDetail } from './pages/users'
import { CategoryList, CreateCategory, CategoryDetail } from './pages/categories'
import { TagList, CreateTag, TagDetail } from './pages/tags'
import { Sider, Header, Footer } from './layouts'
import { Layout } from 'antd'

const App = () => {
  const { Content } = Layout

  return (
    <Router>
      <div>
      <Route path="/login" component={Login}/>
        <Layout className="layout-container">
          <Sider />
          <Layout className="main-container" >
            <Header />
            <Content className="content-container">
            <Switch>
                <Route path="/" exact component={Dashboard} />
                <Route path="/dashboard" component={Dashboard} />
                <Route path="/posts" component={PostList} />
                <Route path="/post/create" component={CreatePost} />
                <Route path="/post/detail/:id" component={PostDetail} />
                <Route path="/users" component={UserList} />
                <Route path="/user/create" component={CreateUser} />
                <Route path="/user/detail/:id" component={UserDetail} />
                <Route path="/categories" component={CategoryList} />
                <Route path="/category/create" component={CreateCategory} />
                <Route path="/category/detail/:id" component={CategoryDetail} />
                <Route path="/tags" component={TagList} />
                <Route path="/tag/create" component={CreateTag} />
                <Route path="/tag/detail/:id" component={TagDetail} />
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
