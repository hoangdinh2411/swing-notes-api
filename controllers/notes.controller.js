const { DB } = require('../config/nedb')
const { v4: uuidv4 } = require('uuid')
async function getNotes(req, res) {
  const user_id = req.user_id
  DB.notes.find(
    {
      user_id,
    },
    (err, docs) => {
      if (docs) {
        return res.status(200).json({
          success: true,
          notes: docs,
        })
      }
      if (err) {
        return res.status(200).json({
          success: false,
          message: 'Cannot get notes from database',
        })
      }
    }
  )
}
async function addNewNote(req, res) {
  try {
    const note = await DB.findOneNoteByTitle(req.body.title)
    if (note) {
      return res.status(200).json({
        success: false,
        message: `The ${req.body.title} note is already exists`,
      })
    }

    const new_note = {
      id: uuidv4(),
      user_id: req.user_id,
      title: req.body.title,
      text: req.body.text,
      createdAt: new Date(),
      modifiedAt: new Date(),
    }

    return DB.notes.insert(new_note, (err, newDoc) => {
      if (newDoc) {
        return res.status(201).json({
          success: true,
        })
      }
      if (err) {
        return res.status(200).json({
          success: false,
          message: 'Cannot add the note on database',
        })
      }
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong',
    })
  }
}

async function updateNote(req, res) {
  console.log(req.body.note_id)
  try {
    if (!req.params.note_id) {
      return res.status(400).json({
        success: false,
        message: 'Note id is required',
      })
    }
    return DB.notes.update(
      {
        id: req.params.note_id,
      },
      {
        $set: {
          title: req.body.title,
          text: req.body.text,
          modifiedAt: new Date(),
        },
      },
      {},
      (err, numReplaced) => {
        if (numReplaced === 0) {
          return res.status(404).json({
            success: false,
            message: 'Note not found',
          })
        }

        if (err) {
          return res.status(200).json({
            success: false,
            message: 'Cannot update the note on database',
          })
        }
        return res.status(200).json({
          success: true,
        })
      }
    )
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong',
    })
  }
}
async function deleteNote(req, res) {
  try {
    if (!req.params.note_id) {
      return res.status(400).json({
        success: false,
        message: 'Note id is required',
      })
    }
    return DB.notes.remove(
      {
        id: req.params.note_id,
      },
      (err, numReplaced) => {
        if (numReplaced === 0) {
          return res.status(404).json({
            success: false,
            message: 'Note not found',
          })
        }

        if (err) {
          return res.status(200).json({
            success: false,
            message: 'Cannot update the note on database',
          })
        }
        return res.status(200).json({
          success: true,
        })
      }
    )
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong',
    })
  }
}

async function searchNotes(req, res) {
  try {
    const title = req.query.title
    if (!title) {
      return res.status(400).json({
        success: false,
        message: 'Search text is required',
      })
    }
    const notes = await DB.searchingNotes(title)
    return res.status(200).json({
      success: true,
      notes,
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong',
    })
  }
}

module.exports = {
  addNewNote,
  getNotes,
  updateNote,
  deleteNote,
  searchNotes,
}
