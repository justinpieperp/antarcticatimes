const Tag = require('../../database/models/tag')
const fs = require('fs')

const resolvers = {
  Query: {
    getTags () {
      return Tag.find().populate('posts')
    }
  },

  Mutation: {
    async createTag (_, args) {
      try {
        const checkTag = await Tag.findOne({ tag: args.tag }).exec()
        if (checkTag === null) {
          const newTag = new Tag({
            tag: args.tag
          })
          const result = await newTag.save()
          console.log('create:' + result)
          return result
        } else {
          throw new Error('Tag already exists')
        }
      } catch (err) {
        throw new Error('unknow err')
      }
    },

    async deleteTag (_, args) {
      try {
        const checkTag = await Tag.findOne({ tag: args.tag }).exec()
        if (checkTag === null) {
          throw new Error("tag doesn't exist")
        } else {
          if (checkTag.posts.length > 0) {
            throw new Error(
              'tag cannot be deleted. There is at least one post under this tag.'
            )
          } else {
            const doc = await Tag.findOneAndDelete({ tag: args.tag }).exec()
            console.log('delete:' + doc)
            return doc
          }
        }
      } catch (err) {
        throw new Error('unknow err')
      }
    },

    async updateTag (_, args) {
      try {
        const checkTag = await Tag.findOne({ tag: args.tag }).exec()
        if (checkTag !== null) {
          const doc = await Tag.findOneAndUpdate(
            { tag: args.tag },
            { tag: args.updateTo },
            { new: true }
          ).exec()
          console.log('update:' + doc)
          return doc
        } else {
          throw new Error("Tag doesn't exist")
        }
      } catch (err) {
        throw new Error('unknow err')
      }
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
