import React from 'react'
import ReactDOM from 'react-dom'
import reportWebVitals from './reportWebVitals'
import 'antd/dist/antd.css'
import './assets/scss/base.scss'
import BasicLayout from './Layout'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache()
})

// import { Layout } from 'antd'
// const { Header, Footer, Sider, Content } = Layout
// ReactDOM.render(
//   <React.StrictMode>
//       <ApolloProvider client={client}>
//       <Layout>
//         <Sider > <Sidebar /></Sider>
//         <Layout>
//           <Header>Header</Header>
//           <Content>Content <App /></Content>
//           <Footer>Footer</Footer>
//         </Layout>
//       </Layout>
//       </ApolloProvider>
//    </React.StrictMode>,
//   document.getElementById('root')
// )

ReactDOM.render(
  <React.StrictMode>
     <ApolloProvider client={client}>
       <BasicLayout />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
