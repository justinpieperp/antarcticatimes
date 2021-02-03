const mongoose = require('mongoose')
const { Schema } = mongoose

const userSchema = new Schema({
  username: {
    type: String,
    required: [true, 'Enter a username'],
    maxlength: [64, 'Use 64 characters or less for your username '],
    unique: true
  },
  email: {
    type: String,
    required: [true, 'Enter your email address'],
    unique: true
  },
  password: {
    type: String,
    required: [true, 'Enter a password'],
    minlength: [8, 'Use 8 characters or more for your password']
  },
  posts: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Post'
    }
  ]
})

module.exports = mongoose.model('User', userSchema)

// email: {
//     type: String,
//     unique: 'This Email is already in use',
//     validate: {
//         validator: () => Promise.resolve(false),
//         message: '{VALUE} is not a valid email'
//     },
//     required: [true, 'Email required']
// }
// })
