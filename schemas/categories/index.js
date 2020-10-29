// const { gql } = require('apollo-server-express');
const Category = require('../../database/models/category')
const fs = require('fs')

const resolvers = {
  // "Cannot return null for non-nullable field" in graphiql: have not populated other collection
  Query: {
    getCategories () {
      return Category.find().populate('posts')
    }
  },

  // Debug: Undefined args on a mutation, using apollo-server
  // The resolver signature is as follows: (parent, args, context, info)

  // use .exec() as execution, easy to return err to graphiql
  // please compare with tags/index.js
  Mutation: {
    async createCategory (_, args) {
      try {
        const checkCategory = await Category.findOne({
          category: args.category
        }).exec()
        if (checkCategory === null) {
          const newCategory = new Category({
            category: args.category
          })
          return newCategory.save()
        } else {
          throw new Error('Category exists')
        }
      } catch (err) {
        throw new Error('unknow err')
      }
    },

    async deleteCategory (_, args) {
      try {
        const checkPost = await Category.findOne({
          category: args.category
        }).exec()
        if (checkPost.posts.length === 0) {
          Category.findOneAndDelete({ category: args.category }).exec()
          return 'Category is deleted successfully'
        } else {
          throw new Error(
            'Catogery cannot be deleted. There is at least one post under this category.'
          )
        }
      } catch (err) {
        throw new Error('unknow err')
      }
    },

    async updateCategory (_, args) {
      try {
        const checkCategory = await Category.findOne({
          category: args.category
        }).exec()
        if (checkCategory !== null) {
          const updatedCategory = await Category.findOneAndUpdate(
            { category: args.category },
            { category: args.updateTo },
            { new: true }
          ).exec()
          return updatedCategory
        } else {
          throw new Error('Cannot find the category.')
        }
      } catch (err) {
        throw new Error('unknow err')
      }
    }
  }
}

// fs: node module, allow us read files from the file system
// dirname is the global file we are in, will help us find the file from root
// const schema = gql(fs.readFileSync(__dirname.concat('/posts-schema.graphql'), 'utf-8'))
const schema = fs.readFileSync(
  __dirname.concat('/categories-schema.graphql'),
  'utf-8'
)

module.exports = { resolvers, schema }
