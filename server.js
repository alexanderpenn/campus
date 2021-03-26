/* eslint-disable semi */
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
  useUnifiedTopology: true,
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
