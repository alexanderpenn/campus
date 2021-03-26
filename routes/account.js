/* eslint-disable semi */
const express = require('express')
const isAuthenticated = require('../middlewares/auth')

const User = require('../models/user')

const router = express.Router()

router.post('/signup', async (req, res, next) => {
  const { username, password } = req.body
  try {
    await User.create({ username, password })
    res.send(`Congratulations ${username}, your account has been created succesfully!`)
  } catch (err) {
    next(err)
  }
})

router.post('/login', (req, res, next) => {
  const { username, password } = req.body

  User.findOne({ username, password })
    .then(() => {
      req.session.username = username
      req.session.password = password
      res.send('Logged in successfully!')
    })
    .catch((err) => next(err))
})

router.post('/logout', isAuthenticated, (req, res) => {
  req.session.username = null
  req.session.password = null
  res.send('user logged out')
})

module.exports = router
