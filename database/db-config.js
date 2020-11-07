const mongoose = require('mongoose')

// mongoose settings
mongoose.set('useNewUrlParser', true)
mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)
mongoose.set('useUnifiedTopology', true)
mongoose
  .connect(
    'mongodb+srv://PenguinD:1019@cluster0.wwmse.mongodb.net/7-myblog?retryWrites=true&w=majority'
  )
  .then(() => {
    console.log('Successfully Connected to MongoDB: 7-myblog')
  })
  .catch((err) => {
    console.log('Error', err)
  })
