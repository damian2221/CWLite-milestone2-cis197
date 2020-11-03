const express = require('express')

const isAuthenticated = require('../middlewares/isAuthenticated')
const Question = require('../models/question')

const router = express.Router()

router.get('/', (req, res, next) => {
  Question.find({}, (err, questions) => {
    if (err) {
      next(err)
    } else {
      res.json(questions)
    }
  })
})

router.post('/add', isAuthenticated, async (req, res, next) => {
  const { questionText } = req.body
  const { username } = req.session

  try {
    await Question.create({ author: username, questionText })
    res.send('Question added')
  } catch (err) {
    next(err)
  }
})

router.post('/answer', isAuthenticated, (req, res, next) => {
  const { answer, _id } = req.body
  Question.findOneAndUpdate({ _id }, { answer }, (err, question) => {
    if (err) {
      next(err)
    } else if (!question) {
      next('Question not found!')
    } else {
      res.send('Answer added')
    }
  })
})

module.exports = router
