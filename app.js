const express = require('express')
const { ApolloServer } = require('apollo-server-express')
const { resolvers, typeDefs } = require('./schemas')
require('./utils/db-config')
const { GraphQLScalarType } = require('graphql')
const { Kind } = require('graphql/language')
const multer = require('multer')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/uploads')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix + '.png')
  }
})

const upload = multer({ storage: storage })

// Apollo Server custom scalar: date
// The getTime() method returns the number of milliseconds* since the Unix Epoch.
// In client end use function: date = new Date(value), date.toString() to convert milliseconds to js Date type
const resolver = {
  Date: new GraphQLScalarType({
    name: 'Date',
    description: 'Date custom scalar type',
    parseValue (value) {
      return new Date(value) // value from the client
    },
    serialize (value) {
      return value.getTime() // value sent to the client
    },
    parseLiteral (ast) {
      if (ast.kind === Kind.INT) {
        return parseInt(ast.value, 10) // ast value is always in string format
      }
      return null
    }
  })
}

const app = express()
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.get('/', (req, res) => {
  // res.send('hello from the graphql-db')
  res.sendFile('index.html', { root: '.' })
})

app.post('/upload', upload.single('photo'), function (req, res, next) {
  // req.file is the `avatar` file
  // req.body will hold the text fields, if there were any
  res.send({
    status: true,
    message: 'Upload Success',
    data: {
      name: req.file.originalname,
      content: req.body
    }
  })
})

const server = new ApolloServer({
  typeDefs: typeDefs,
  resolvers: [resolver, ...resolvers]
})
server.applyMiddleware({ app })

app.listen('4000', () => {
  console.log('Server started at port 4000')
})
