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
    await updateNoteSchema.validateAsync(req.body)
    next()
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message })
  }
}

module.exports = {
  checkBody,
  checkBodyUpdateNote,
}
