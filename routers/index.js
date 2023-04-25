const express = require('express')
const userRouter = require('./user.route')
const notesRouter = require('./notes.route')
const { checkToken } = require('../middleware/user.middleware')

const app = express()

app.use('/user', userRouter)
app.use('/notes', checkToken, notesRouter)
module.exports = app
