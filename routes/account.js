const express = require('express')

const isAuthenticated = require('../middlewares/isAuthenticated')
const User = require('../models/user')

const router = express.Router()

router.post('/signup', async (req, res, next) => {
  const { username, password } = req.body

  try {
    await User.create({ username, password })
    req.session.username = username
    res.send('Account created')
  } catch (err) {
    next(err)
  }
})

router.post('/login', (req, res, next) => {
  const { username, password } = req.body

  User.findOne({ username, password }, (err, user) => {
    if (err) {
      next(err)
    } else if (!user) {
      next('Invalid credentials!')
    } else {
      req.session.username = username
      res.send('Logged in')
    }
  })
})

router.post('/logout', isAuthenticated, (req, res) => {
  req.session.username = undefined
  res.send('Logged out')
})

module.exports = router
