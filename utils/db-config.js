const mongoose = require('mongoose')
require('dotenv').config()

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.wwmse.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log('Successfully Connected to MongoDB')
  })
  .catch((err) => {
    console.log('Error', err)
  })
