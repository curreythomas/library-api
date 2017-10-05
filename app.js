require('dotenv').config()
const port = process.env.PORT || 4000
const dal = require('./dal.js')
const express = require('express')
const app = express()
const HTTPError = require('node-http-error')

// get a book GET /books/id

app.get('/books/:id', function(req, res, next) {
  dal.getBook(req.params.id, function(err, doc) {
    if (err) return next(new HTTPError(err.status, err.message))
    res.status(200).send(doc)
  })
})

////////////////////
// ERROR HANDLER
////////////////////

app.use(function(err, req, res, next) {
  console.log(req.method, ' ', req.path, ' ', 'error', err)
  res.status(err.status || 500).send(err)
})

app.listen(port, () => console.log('API is up on port', port))
