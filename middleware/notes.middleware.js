const { noteSchema, updateNoteSchema } = require('../utils/validation')

const checkBody = async (req, res, next) => {
  try {
    await noteSchema.validateAsync(req.body)
    next()
  } catch (error) {
    console.log(error)
    return res.status(400).json({ success: false, message: error.message })
  }
}
const checkBodyUpdateNote = async (req, res, next) => {
  try {
    if (req.body.hasOwnProperty('title') || req.body.hasOwnProperty('text')) {
      await updateNoteSchema.validateAsync(req.body)
      next()
    } else {
      return res.status(400).json({
        success: false,
        message: 'Title or text is required',
      })
    }
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message })
  }
}

module.exports = {
  checkBody,
  checkBodyUpdateNote,
}
