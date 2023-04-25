const bcrypt = require('bcrypt')
const { v4: uuidv4 } = require('uuid')
const jsonwebtoken = require('jsonwebtoken')
const { DB } = require('../config/nedb')
const { token_key } = require('../config/env')

async function signup(req, res) {
  try {
    const user = await DB.findOneUserByUsername(req.body.username)
    if (user) {
      return res.status(200).json({
        success: false,
        message: 'Username is already exists',
      })
    }
    const saltRounds = 10
    const hash = bcrypt.hashSync(req.body.password, saltRounds)
    const newUser = {
      id: uuidv4(),
      username: req.body.username,
      hash,
    }

    return DB.user.insert(newUser, (err, newDoc) => {
      if (newDoc) {
        return res.status(201).json({
          success: true,
        })
      }
      if (err) {
        return res.status(200).json({
          success: false,
          message: 'Cannot register new account',
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

async function login(req, res) {
  try {
    const user = await DB.findOneUserByUsername(req.body.username)
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      })
    }

    const isCorrectPassword = bcrypt.compareSync(req.body.password, user.hash)
    if (!isCorrectPassword) {
      return res.status(200).json({
        success: false,
        message: 'Incorrect password',
      })
    }
    const token = jsonwebtoken.sign(
      {
        id: user.id,
      },
      token_key,
      {
        expiresIn: '1h',
      }
    )
    return res.status(200).json({
      success: true,
      token,
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong',
    })
  }
}

module.exports = {
  signup,
  login,
}
