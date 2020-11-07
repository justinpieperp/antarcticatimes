const mongoose = require('mongoose')
const Schema = mongoose.Schema

const postSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  body: {
    type: String,
    required: true
  },
  // date: {
  //   type: Date,
  //   default: Date.now,
  //   required: true
  // },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: true

  },
  tags: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Tag'
    }
  ]
},
{ timestamps: true }
)

module.exports = mongoose.model('Post', postSchema)
