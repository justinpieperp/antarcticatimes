const mongoose = require('mongoose')
const Schema = mongoose.Schema

const postSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  user: {
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
  imageURL: {
    type: String,
    default: '111.jpg',
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
      ref: 'Tag',
      required: false
    }
  ]
},
{ timestamps: true }
)

module.exports = mongoose.model('Post', postSchema)
