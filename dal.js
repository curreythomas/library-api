require('dotenv').config()

const PouchDB = require('pouchdb')
const dbName = process.env.COUCH_DATABASE
const dbURL = process.env.COUCH_URL

const db = new PouchDB(dbURL + dbName)

const addBook = (book, callback) => add(book, callback)
const getBook = (id, callback) => get(id, callback)
const updateBook = (book, callback) => update(book, callback)
const deleteBook = (book, callback) => del(id, callback)

function add(doc, callback) {
  db.put(doc, function(err, data) {
    if (err) {
      callback(err)
    } else {
      callback(null, data)
    }
  })
}

function get(id, callback) {
  db.get(id, function(err, data) {
    if (err) {
      callback(err)
    } else {
      callback(null, data)
    }
  })
}

function update(doc, callback) {
  db.put(doc, function(err, data) {
    if (err) {
      callback(err)
    } else {
      callback(null, data)
    }
  })
}

function deleteDoc(id, callback) {
  db.get(id, function(err, data) {
    if (err) return callback(err)

    db.remove(data, function(err, removedResult) {
      if (err) return callback(err)
      callback(null, removedResult)
    })
  })
}

const dal = {
  addBook,
  getBook,
  updateBook,
  deleteBook
}

module.export = dal
