const User = require('../../modules/models/user')
const fs = require('fs')
const bcrypt = require('bcryptjs')

const resolvers = {
  Query: {
    getUsers () {
      return User.find({}).populate('posts')
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
    }
  }
}

const schema = fs.readFileSync(__dirname.concat('/users-schema.graphql'), 'utf-8')

module.exports = { resolvers, schema }
