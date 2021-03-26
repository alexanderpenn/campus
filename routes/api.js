/* eslint-disable camelcase */
/* eslint-disable semi */
const express = require('express')
const Question = require('../models/question')
// const { default: question } = require('../models/question')
const isAuthenticated = require('../middlewares/auth')

const router = express.Router();

router.get('/questions', isAuthenticated, async (req, res) => {
  const questions = await Question.find({})
  res.json(questions)
})

router.post('/questions/add', isAuthenticated, async (req, res, next) => {
  try {
    const { questionText, answer, author } = req.body;
    const newQuestion = Question({ questionText, answer, author })
    await newQuestion.save();
    res.send('Success, you have added a question!')
  } catch (err) {
    next(err)
  }
})

router.post('/questions/answer', isAuthenticated, async (req, res, next) => {
  try {
    const { question_id, answer } = req.body;
    const question = await Question.findById(question_id)
    question.answer = answer;
    await question.save();
    res.send('Success, the question has had its answer updated!')
  } catch (err) {
    next(err)
  }
})

module.exports = router
