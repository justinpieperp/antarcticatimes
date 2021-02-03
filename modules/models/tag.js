const mongoose = require('mongoose')
const Schema = mongoose.Schema

const tagSchema = new Schema({
  tag: {
    type: String,
    required: true,
    unique: true
  },
  posts: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Post'
    }
  ]
})

module.exports = mongoose.model('Tag', tagSchema)
