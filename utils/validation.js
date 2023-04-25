const yup = require('yup')

const userSchema = yup.object({
  username: yup.string().required(),
  password: yup.string().min(6).max(15).required(),
})

const noteSchema = yup.object({
  title: yup.string().max(50).required(),
  text: yup.string().max(300).required(),
})
const updateNoteSchema = yup.object({
  title: yup.string().max(50),
  text: yup.string().max(300),
})
module.exports = {
  userSchema,
  noteSchema,
  updateNoteSchema,
}
