const joi = require('joi')

const userSchema = joi.object({
  username: joi.string().required().messages({
    'string.empty': 'Username is required',
    'string.base': 'Username must be a string',
  }),
  password: joi.string().min(6).max(15).required().messages({
    'string.empty': 'Password is required',
    'string.min': 'Password must have length between 6 and 15 characters',
    'string.max': 'Password must have length between 6 and 15 characters',
    'string.base': 'Password must be a string',
  }),
})

const noteSchema = joi.object({
  title: joi.string().max(50).required().messages({
    'string.empty': 'Title is required',
    'string.max':
      'Title must be a string with a maximum length of 50 characters',
    'string.base': 'Title must be a string',
  }),
  text: joi.string().max(300).required().messages({
    'string.empty': 'Text is required',
    'string.max':
      'Text must be a string with a maximum length of 300 characters',
    'string.base': 'Text must be a string',
  }),
})
const updateNoteSchema = joi.object({
  title: joi.string().max(50).messages({
    'string.max':
      'Title must be a string with a maximum length of 50 characters',
    'string.base': 'Title must be a string',
  }),
  text: joi.string().max(300).messages({
    'string.max':
      'Text must be a string with a maximum length of 300 characters',
    'string.base': 'Title must be a string',
  }),
})
module.exports = {
  userSchema,
  noteSchema,
  updateNoteSchema,
}
