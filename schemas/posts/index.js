const { Post, User, Category, Tag } = require('../../modules/index')
const fs = require('fs')

const resolvers = {
  Query: {
    getPosts: async () => {
      return await Post.find()
        .populate('user')
        .populate('category')
        .populate('tags')
        .exec()
    },
    getPostById: async (_, args) => {
      return await Post.findOne({ _id: args._id })
        .populate('user')
        .populate('category')
        .populate('tags')
        .exec()
    },
    getPostSortByDate: async () => {
      return await Post.find()
        .sort({ createdAt: 'descending' })
        .limit(12)
        .populate('user')
        .populate('category')
        .populate('tags')
        .exec()
    }
  },

  Mutation: {
    createPost: async (_, args) => {
      // 返回所有找到的tags, 如果input里有nonexist tag, 不会报错
      const existentTagsObj = await Tag.find({ tag: args.tags }).exec()
      const existentTagsArray = await existentTagsObj.map(item => item.tag)
      const nonexistentTagsArray = await args.tags.filter(item => !existentTagsArray.includes(item))

      const insertTags = await Promise.all(nonexistentTagsArray.map(item => {
        return Tag.insertMany(
          { tag: item }
        )
      }))

      const tagNames = await Tag.find({ tag: args.tags }).exec()
      const tagIds = await tagNames.map(item => { return item._id })

      const savedPost = await new Post({
        title: args.title,
        user: args.user,
        description: args.description,
        body: args.body,
        category: args.category,
        imageURL: args.imageURL,
        tags: tagIds
      }).save()

      // 如果input tags里面有不存在的tag, 弹出提示, 一个思路是input tags array和current tags array比较
      // 查看Stack Overflow的collection
      // const nonexistentTag = checkTags.findIndex(tag => tag === null)
      // console.log(nonexistentTag)
      // const tags = await Tag.find({}, 'tag') // .exec()
      // console.log(tags)
      // const nonexistentTags = args.tags.filter(tag => Tag.find({})!)
      // } else if (checkTags.includes(null)) {
      //   throw new Error("At least one tag doesn't exist")
      // const tagsInputArray = await Promise.all(tagsNameInputArray.map(e =>
      //   Tag.findOne({ tag: e })
      // ))

      await User.findOneAndUpdate(
        { _id: savedPost.user },
        { $push: { posts: savedPost._id } },
        { new: true }
      ).exec()

      await Category.findOneAndUpdate(
        { _id: savedPost.category },
        { $push: { posts: savedPost._id } },
        { new: true }
      ).exec()

      // console.log('tagIds: ' + tagIds)
      await Tag.updateMany(
        { _id: tagIds },
        { $push: { posts: savedPost._id } },
        { new: true }
      ).exec()

      return savedPost
    },

    deletePost: async (_, args) => {
      const deletedObj = await Post.findOneAndDelete({ _id: args._id }).exec()

      // const temp1 = await Tag.find(
      //   { _id: { $in: deletedObj.tags } }
      // ).exec()

      await Tag.updateMany(
        { _id: { $in: deletedObj.tags } },
        { $pull: { posts: deletedObj._id } },
        { new: true }
      ).exec()

      await User.findOneAndUpdate(
        { _id: deletedObj.user },
        { $pull: { posts: deletedObj._id } },
        { new: true }).exec()

      await Category.findOneAndUpdate(
        { _id: deletedObj.category },
        { $pull: { posts: deletedObj._id } },
        { new: true }).exec()

      return `Successfully Delete Post: ${deletedObj.title} Created by user ${deletedObj.user}`
    },

    updatePost: async (_, args) => {
      const currObj = await Tag.findById({ _id: args._id }).exec()
      const currTags = currObj.tags.map((item, index) => { return item.tag })

      const existentTagsObj = await Tag.find({ tag: args.tags }).exec()
      const existentTagsArray = await existentTagsObj.map(item => item.tag)
      const nonexistentTagsArray = await args.tags.filter(item => !existentTagsArray.includes(item))

      const insertTags = await Promise.all(nonexistentTagsArray.map(item => {
        return Tag.insertMany(
          { tag: item }
        )
      }))

      const tagNames = await Tag.find({ tag: args.tags }).exec()
      const tagIds = await tagNames.map(item => { return item._id })

      const updatedPost = await Post.findOneAndUpdate(
        { _id: args._id },
        {
          title: args.title,
          user: args.user,
          description: args.description,
          body: args.body,
          category: args.category,
          imageURL: args.imageURL,
          tags: tagIds
        }, { new: true }
      ).exec()

      if (currObj.user !== args.user) {
        await User.findOneAndUpdate(
          { _id: currObj.user },
          { $pull: { posts: args._id } },
          { new: true }
        ).exec()

        await User.findOneAndUpdate(
          { _id: args.user },
          { $push: { posts: args._id } },
          { new: true }
        ).exec()
      }

      if (currObj.category !== args.category) {
        await Category.findOneAndUpdate(
          { _id: currObj.category },
          { $pull: { posts: args._id } },
          { new: true }
        ).exec()

        await Category.findOneAndUpdate(
          { _id: args.category },
          { $push: { posts: args._id } },
          { new: true }
        ).exec()
      }

      await Tag.updateMany(
        { _id: tagIds },
        { $push: { posts: updatedPost._id } },
        { new: true }
      ).exec()

      return updatedPost
    }

  }
}

const schema = fs.readFileSync(
  __dirname.concat('/posts-schema.graphql'),
  'utf-8'
)

module.exports = { resolvers, schema }
