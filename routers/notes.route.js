const express = require('express')
const {
  addNewNote,
  getNotes,
  updateNote,
  deleteNote,
  searchNotes,
} = require('../controllers/notes.controller')
const {
  checkBody,
  checkBodyUpdateNote,
} = require('../middleware/notes.middleware')

const notesRouter = express.Router()

notesRouter.get('/', getNotes)
notesRouter.get('/search', searchNotes)
notesRouter.post('/', checkBody, addNewNote)
notesRouter.put('/:note_id', checkBodyUpdateNote, updateNote)
notesRouter.delete('/:note_id', deleteNote)

module.exports = notesRouter
