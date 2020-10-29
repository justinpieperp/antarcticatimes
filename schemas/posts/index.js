const Post = require('../../database/models/post')
const User = require('../../database/models/user')
const Category = require('../../database/models/category')
// const Tag = require("../../database/models/tag");
const fs = require('fs')

const resolvers = {
  Query: {
    getPosts () {
      return Post.find()
        .populate('author')
        .populate('category')
        .populate('tags')
    }
  },

  Mutation: {
    async createPost (_, args) {
      const post = new Post({
        title: args.title,
        author: args.author,
        body: args.body,
        // date: new Date(args.date),
        description: args.description,
        category: args.category,
        tags: [args.tags]
      })
      try {
        // const user = await User.findOne({username: args.author}).exec();
        const user = await User.findById(args.author).exec()
        user.posts.push(post)
        user.save()

        const checkCategory = await Category.find({ category: args.category })
        const category = await Category.findById(args.category).exec()

        if (checkCategory == null) {
          const newCategory = new Category({
            category: args.category
          })
          newCategory.save()
        }

        category.posts.push(post)
        category.save()
        post.save()
      } catch (err) {
        throw new Error('unknow err')
      }
      return post
    }
  }
}

const schema = fs.readFileSync(
  __dirname.concat('/posts-schema.graphql'),
  'utf-8'
)

module.exports = { resolvers, schema }
