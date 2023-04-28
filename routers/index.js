const express = require('express')
const userRouter = require('./user.route')
const notesRouter = require('./notes.route')
const { checkToken } = require('../middleware/user.middleware')

const app = express()

app.use('/user', userRouter)
app.use('/notes', checkToken, notesRouter)
app.use('/*', (req, res) => {
  return res.status(404).json({ success: false, message: 'Page not found' })
})
module.exports = app
