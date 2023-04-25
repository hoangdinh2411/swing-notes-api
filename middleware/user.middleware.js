const jsonwebtoken = require('jsonwebtoken')
const { userSchema } = require('../utils/validation')
const { token_key } = require('../config/env')

const checkBody = async (req, res, next) => {
  try {
    await userSchema.validate(req.body)
    next()
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message })
  }
}

const checkToken = (req, res, next) => {
  if (!req.headers.authorization) {
    return res
      .status(400)
      .json({ success: false, message: 'Token is required in header' })
  }
  const token = req.headers.authorization.split(' ')[1]

  if (!token) {
    return res.status(401).json({ success: false, message: 'Missing token ' })
  }

  jsonwebtoken.verify(token, token_key, function (err, decoded) {
    if (err) {
      return res.status(401).json({ success: false, message: err.message })
    }
    req.user_id = decoded.id
    next()
  })
}

module.exports = {
  checkBody,
  checkToken,
}
