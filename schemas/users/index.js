const User = require('../../modules/models/user')
const fs = require('fs')
const bcrypt = require('bcryptjs')

const resolvers = {
  Query: {
    getUsers: async () => {
      return await User.find({}).populate('posts').exec()
    },

    getUserById: async (_, args) => {
      return await User.findOne({ _id: args._id }).populate('posts').exec()
    }
  },

  Mutation: {
    createUser: (_, args) => {
      const salt = bcrypt.genSaltSync(10)
      const hash = bcrypt.hashSync('args.password', salt)
      const user = new User({
        username: args.username,
        email: args.email,
        password: hash
      })
      user.save()
      return user
    },

    deleteUser: async (_, args) => {
      const user = await User.findOne({ _id: args._id })
      if (user === null) {
        throw new Error('User does not exsit.')
      }
      await User.deleteOne({ _id: args._id })
      return 'Successfully Delete User'
    },

    updateUser: async (_, args) => {
      const currUser = await User.findOne({ _id: args._id })
      if (currUser === null) {
        throw new Error('User does not exist')
      }
      const newUser = await User.findOneAndUpdate(
        { _id: args._id },
        {
          username: args.newUsername,
          email: args.newEmail
        },
        { new: true }
      ).exec()
      return newUser
    }
  }
}

const schema = fs.readFileSync(__dirname.concat('/users-schema.graphql'), 'utf-8')

module.exports = { resolvers, schema }
