const neDB = require('nedb')

const DB = {
  user: new neDB({
    filename: './models/User.db',
    autoload: true,
    timestampData: false,
    corruptAlertThreshold: 1,
  }),
  findOneUserByUsername: function (username) {
    return new Promise((resolve, reject) => {
      this.user.findOne(
        {
          username,
        },
        (err, docs) => {
          if (err) {
            reject(err)
          }
          resolve(docs)
        }
      )
    })
  },
  findOneUserById: function (id) {
    return new Promise((resolve, reject) => {
      this.user.findOne(
        {
          id,
        },
        (err, docs) => {
          if (err) {
            reject(err)
          }
          resolve(docs)
        }
      )
    })
  },
  notes: new neDB({
    filename: './models/Notes.db',
    autoload: true,
    timestampData: false,
    corruptAlertThreshold: 1,
  }),
  findOneNoteByTitle: function (title) {
    return new Promise((resolve, reject) => {
      this.notes.findOne(
        {
          title,
        },
        (err, docs) => {
          if (err) {
            reject(err)
          }
          resolve(docs)
        }
      )
    })
  },
  findOneNoteById: function (id) {
    return new Promise((resolve, reject) => {
      this.notes.findOne(
        {
          id,
        },
        (err, docs) => {
          if (err) {
            reject(err)
          }
          resolve(docs)
        }
      )
    })
  },
  searchingNotes: function (title, user_id) {
    return new Promise((resolve, reject) => {
      return DB.notes.find(
        {
          title: {
            $regex: new RegExp(`${title}*`, 'i'),
          },
        },
        (err, docs) => {
          if (err) {
            reject(err)
          }
          resolve(docs)
        }
      )
    })
  },
}

function connectDatabase() {
  DB.user.loadDatabase()
  DB.notes.loadDatabase()
}

module.exports = {
  connectDatabase,
  DB,
}
