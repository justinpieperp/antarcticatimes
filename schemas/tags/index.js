const Tag = require('../../modules/models/tag')
const fs = require('fs')

const resolvers = {
  Query: {
    getTags: async () => {
      const tags = await Tag.find().populate('posts').exec()
      return tags
    },

    getTagById: async (_, args) => {
      const tag = await Tag.findById({ _id: args._id }).populate('posts').exec()
      return tag
    },

    getTagByName: async (_, args) => {
      const tag = await Tag.findOne({ tag: args.tag }).populate('posts').exec()
      return tag
    }
  },

  Mutation: {
    createTag: async (_, args) => {
      const checkTag = await Tag.findOne({ tag: args.tag }).exec()
      if (checkTag !== null) {
        throw new Error('Tag exists')
      }
      const newTag = new Tag({
        tag: args.tag
      })
      const result = await newTag.save()
      console.log('created a new tag:' + result)
      return result
    },

    deleteTag: async (_, args) => {
      const checkTag = await Tag.findOne({ tag: args.tag }).exec()
      if (checkTag === null) {
        throw new Error("Tag doesn't exist")
      }
      if (checkTag.posts.length !== 0) {
        throw new Error('Tag cannot be deleted when at least one post under this tag.')
      }
      const deletedTag = await Tag.findOneAndDelete({ tag: args.tag }).exec()
      console.log('delete:' + deletedTag)
      return deletedTag
    },

    updateTag: async (_, args) => {
      const existed = await Tag.findOne({ tag: args.updateTo }).exec()
      if (existed !== null) {
        throw new Error('Tag Exists!')
      }
      const updatedTag = await Tag.findOneAndUpdate(
        { _id: args._id },
        { tag: args.updateTo },
        { new: true }
      ).exec()
      console.log('update:' + updatedTag)
      return updatedTag
    }
  }
}

const schema = fs.readFileSync(
  __dirname.concat('/tags-schema.graphql'),
  'utf-8'
)

module.exports = { resolvers, schema }

// use callback function as execution, haven't find a way to return err to graphiql
// can't handle error return newTag:undefined
// newTag return before being assigned value in callback function
// how to make it return after callback?
// use next()? but I already use async/await

// let newTag;
// await Tag.findOne({ tag: args.tag }, (err, doc) => {
//   if (doc === null) {
//     const tag = new Tag({
//       tag: args.tag,
//     });
//     tag.save();
//     newTag = tag;
//     console.log("inside" + newTag);
//   } else if (doc) {
//     throw new Error("Tag already exists");
//   } else {
//     throw err;
//   }
// });
// console.log("return" + newTag);
// return newTag;

// let deletedTag;
// await Tag.findOneAndDelete({ tag: args.tag }, (err, doc) => {
//   if (doc) {
//     deletedTag = doc;
//     console.log("success" + doc);
//   } else if (doc === null) {
//     //console.log("fail" + doc);
//     throw new Error("Tag doesn't exists");
//   } else {
//     throw err;
//   }
// });
// //console.log("return" + deletedTag);
// return deletedTag;

//   let updatedTag;
//   await Tag.findOneAndUpdate(
//     { tag: args.tag },
//     { tag: args.updateTo },
//     { new: true },
//     (err, doc) => {
//       if (doc) {
//         updatedTag = doc;
//       }
//       if (doc === null) {
//         throw new Error("Tag doesn't exists");
//       } else {
//         throw err;
//       }
//     }
//   );
//   return updatedTag;
