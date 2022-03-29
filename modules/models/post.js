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
  description: {
    type: String,
    required: false
  },
  body: {
    type: String,
    required: true
  },
  image: {
    type: String,
    default: 'n95.jpg',
    required: false
  },
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
