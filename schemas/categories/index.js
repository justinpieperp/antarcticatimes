const Category = require('../../modules/models/category')
const fs = require('fs')

const resolvers = {
  // "Cannot return null for non-nullable field" in graphiql: have not populated other collection
  Query: {
    getCategories: async () => {
      const res = await Category.find().populate('posts').exec()
      return res
    },

    getCategoryById: async (_, args) => {
      return await Category.findOne({ _id: args._id }).populate('posts').exec()
    }
  },

  // Debug: Undefined args on a mutation, using apollo-server
  // The resolver signature is as follows: (parent, args, context, info)

  // use .exec() as execution, easy to return err to graphiql
  // please compare with tags/index.js
  Mutation: {
    createCategory: async (_, args) => {
      const checkCategory = await Category.findOne({
        category: args.category
      }).exec()
      if (checkCategory !== null) {
        throw new Error('Category Exists')
      }
      const newCategory = new Category({
        category: args.category
      })
      newCategory.save()
      return newCategory
    },

    deleteCategory: async (_, args) => {
      const checkCategory = await Category.findOne({ _id: args._id }).exec()
      if (checkCategory === null) {
        throw new Error("Category doesn't exist")
      }
      if (checkCategory.posts.length !== 0) {
        throw new Error('There is at least one post under this category.')
      }
      const deletedCategory = await Category.findOneAndDelete({ _id: args._id }).exec()
      console.log('delete:' + deletedCategory)
      return deletedCategory
    },

    updateCategory: async (_, args) => {
      const checkCategory = await Category.findOne({ _id: args._id }).exec()
      if (checkCategory === null) {
        throw new Error("Category doesn't exist.")
      }
      const updatedCategory = await Category.findOneAndUpdate(
        { _id: args._id },
        { category: args.updateTo },
        { new: true }
      ).exec()
      return updatedCategory
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
