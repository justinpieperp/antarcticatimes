import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Dashboard from './pages/dashboard'
import Login from './pages/login'
import NotFoundPage from './pages/error'
import { PostList, CreatePost, PostDetail } from './pages/posts'
import { UserList, CreateUser, UserDetail } from './pages/users'
import { CategoryList, CreateCategory, CategoryDetail } from './pages/categories'
import { TagList, CreateTag, TagDetail } from './pages/tags'
import { Sider, Header, Footer } from './layouts'
import { Layout } from 'antd'
import { ErrorBoundary } from 'react-error-boundary'

const App = () => {
  const { Content } = Layout
  const ErrorFallback = ({ error, resetErrorBoundary }) => {
    return (
      <div role="alert">
        <p>Something went wrong:</p>
        <pre>{error.message}</pre>
        <button onClick={resetErrorBoundary}>Try again</button>
      </div>
    )
  }

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <BrowserRouter>
        <Layout className="layout-container">
          <Sider />
          <Layout className="main-container" >
            <Header />
            <Content className="content-container">
              <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/login" element={Login}/>
                  {/* post router */}
                  <Route path="posts">
                    <Route index element={<PostList />} />
                    <Route path=":id/edit" element={<PostDetail />} />
                    <Route path="create" element={<CreatePost />} />
                  </Route>
                  {/* user router */}
                  <Route path="users">
                    <Route index element={<UserList />} />
                    <Route path=":id/edit" element={<UserDetail />} />
                    <Route path="create" element={<CreateUser />} />
                  </Route>
                  {/* cate router */}
                  <Route path="categories">
                    <Route index element={<CategoryList />} />
                    <Route path=":id/edit" element={<CategoryDetail/>} />
                    <Route path="create" element={<CreateCategory/>} />
                  </Route>
                  {/* tag router */}
                  <Route path="tags">
                    <Route index element={<TagList/>} />
                    <Route path=":id/edit" element={<TagDetail/>} />
                    <Route path="create" element={<CreateTag/>} />
                  </Route>
                  <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </Content>
          <Footer />
        </Layout>
      </Layout>
    </BrowserRouter>
  </ErrorBoundary>
  )
}

export default App
