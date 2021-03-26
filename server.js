var MongoClient = require('mongodb').MongoClient
const mongoose = require('mongoose')
const express = require('express')
const cookieSession = require('cookie-session')
const errorHandler = require('./middlewares/errorHandler')

const accountRouter = require('./routes/account')
const apiRouter = require('./routes/api')

const app = express()
const MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/test'

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

app.use(errorHandler)
app.use(cookieSession({
  name: 'session',
  keys: ['peterisrandom'],
}))

app.use(express.json())


app.use('/account', accountRouter)
app.use('/api', apiRouter)
app.get('/', (req, res) => {
  res.send(`welcome ${req.session.username}`)
})


app.listen(3000, () => {
  console.log('listening on 3000')
})



// line 10 within account create
// should the answers be their own document or should they be attached to a question? 

// 
// add cookiesession middleware to serverjs does cookiesession need keys passed in
// handle accounts signup, login, and logout all as post requests
// handle api questions get, add as a post, and answer as a post
    // question = await Question.find({_id: id})
    // await question.save()