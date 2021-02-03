const { Post, User, Category, Tag } = require('../../modules/index')
const fs = require('fs')

const resolvers = {
  Query: {
    getPosts () {
      const posts = Post.find()
        .populate('author')
        .populate('category')
        .populate('tags').exec()
      return posts
    }
  },

  Mutation: {
    async createPost (_, args) {
      const userInput = await User.findOne({ username: args.author }).exec()
      const categoryInput = await Category.findOne({ category: args.category }).exec()

      const tagsNameInputArray = args.tags
      // console.log(tagsNameInputArray)
      const tagsInputArray = await Promise.all(tagsNameInputArray.map(e =>
        Tag.findOne({ tag: e })
      ))
      // console.log(tagsInputArray)

      // 想实现如果input tag里面有不存在的tag, 弹出提示, 一个思路是input tag array和tags array比较
      // 查看Stack Overflow的collection
      // const nonexistentTag = checkTags.findIndex(tag => tag === null)
      // console.log(nonexistentTag)
      // const tags = await Tag.find({}, 'tag') // .exec()
      // console.log(tags)
      // const nonexistentTags = args.tags.filter(tag => Tag.find({})!)

      if (userInput === null) {
        console.log("The author doesn't exist.")
        throw new Error("The author doesn't exist.")
      } else if (categoryInput === null) {
        console.log("The cate doesn't exist.")
        throw new Error("The category doesn't exist.")
      // } else if (checkTags.includes(null)) {
      //   throw new Error("At least one tag doesn't exist")
      } else {
        const newPost = new Post({
          title: args.title,
          author: userInput._id,
          body: args.body,
          category: categoryInput._id,
          tags: tagsInputArray.map(e => e._id)
        })
        userInput.posts.push(newPost)
        userInput.save()

        categoryInput.posts.push(newPost)
        categoryInput.save()

        tagsNameInputArray.forEach(async e => {
          const tag = await Tag.findOne({ tag: e }).exec()
          tag.posts.push(newPost)
          tag.save()
        })

        newPost.save()

        // return的newpost里只有关联表的id, 级联查询没有实现
      }
    }
  }
}

const schema = fs.readFileSync(
  __dirname.concat('/posts-schema.graphql'),
  'utf-8'
)

module.exports = { resolvers, schema }
