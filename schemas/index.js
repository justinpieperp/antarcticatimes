const postSchema = require('./posts')
const userSchema = require('./users')
const categorySchema = require('./categories')
const tagSchema = require('./tags')

const typeDefs = [
  postSchema.schema,
  userSchema.schema,
  categorySchema.schema,
  tagSchema.schema
]

const resolvers = [
  postSchema.resolvers,
  userSchema.resolvers,
  categorySchema.resolvers,
  tagSchema.resolvers
]

module.exports = { typeDefs, resolvers }
