const express = require('express')
const { signup, login } = require('../controllers/user.controller')
const { checkBody } = require('../middleware/user.middleware')

const userRouter = express.Router()

userRouter.post('/signup', checkBody, signup)
userRouter.post('/login', checkBody, login)

module.exports = userRouter
