const express = require('express')
const { ApolloServer } = require('apollo-server-express')
const { resolvers, typeDefs } = require('./schemas')
require('./database/db-config')

const app = express()

app.get('/', (req, res) => {
  res.send('hello from the graphql-db')
})

const server = new ApolloServer({ typeDefs, resolvers, tracing: true })
server.applyMiddleware({ app })

app.listen('4000', () => {
  console.log('Server started at port 4000')
})
