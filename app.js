require('dotenv').config()
const port = process.env.PORT || 4000
const {
  addBook,
  getBook,
  updateBook,
  deleteBook,
  addAuthor,
  getAuthor,
  updateAuthor,
  deleteAuthor
} = require('./dal.js')
const express = require('express')
const app = express()
const HTTPError = require('node-http-error')
const bodyParser = require('body-parser')
const checkRequiredFields = require('./lib/check-required-fields.js')
const { not, isEmpty, merge, __, omit, prop, compose, join } = require('ramda')

app.use(bodyParser.json())

//BOOKS

app.post('/books', function(req, res, next) {
  // check to make sure the request body exists
  if (isEmpty(prop('body', req))) {
    return next(
      new HTTPError(
        400,
        'Missing request body. Content-Type header should be application/json.'
      )
    )
  }
  //force the type prop to be 'book'
  // const body = merge(prop('body', req), { type: 'book' })

  // omit an _id prop if present
  //body = omit(['_id', '_rev'], body)

  const body = compose(
    omit(['_id', '_rev']),
    merge(__, { type: 'book' }),
    prop('body')
  )(req)

  // check to make sure require fields are present in the body
  const missingFields = checkRequiredFields(
    ['title', 'type', 'author', 'ISBN', 'genre', 'description'],
    body
  )

  if (not(isEmpty(missingFields))) {
    return next(
      new HTTPError(
        400,
        `Missing Required Fields: ${join(', ', missingFields)}`
      )
    )
  }

  addBook(body, function(err, addResult) {
    if (err) return next(new HTTPError(err.status, err.message))
    res.status(201).send(addResult)
  })
})

app.put('/books/:id', function(req, res, next) {
  if (isEmpty(prop('body', req))) {
    return next(
      new HTTPError(
        400,
        'Missing request body. Content-Type header should be application/json.'
      )
    )
  }
  const missingFields = checkRequiredFields(
    [
      '_id',
      '_rev',
      'type',
      'title',
      'type',
      'author',
      'ISBN',
      'genre',
      'description'
    ],
    prop('body', req)
  )
  if (not(isEmpty(missingFields))) {
    return next(
      new HTTPError(
        400,
        `Missing Required Fields: ${join(', ', missingFields)}`
      )
    )
  }

  updateBook(prop('body', req), function(err, updateResult) {
    if (err) return next(new HTTPError(err.status, err.message))
    res.status(200).send(updateResult)
  })
})

// get a book GET /books/id
app.get('/books/:id', function(req, res, next) {
  getBook(req.params.id, function(err, doc) {
    if (err) return next(new HTTPError(err.status, err.message))
    res.status(200).send(doc)
  })
})

app.delete('/books/:id', function(req, res, next) {
  deleteBook(req.params.id, function(err, doc) {
    if (err) return next(new HTTPError(err.status, err.message))
    res.status(200).send(doc)
  })
})

//AUTHORS
app.post('/authors', function(req, res, next) {
  // check to make sure the request body exists
  if (isEmpty(prop('body', req))) {
    return next(
      new HTTPError(
        400,
        'Missing request body. Content-Type header should be application/json.'
      )
    )
  }
  //force the type prop to be 'author'
  // const body = merge(prop('body', req), { type: 'author' })

  // omit an _id prop if present
  //body = omit(['_id', '_rev'], body)

  const body = compose(
    omit(['_id', '_rev']),
    merge(__, { type: 'author' }),
    prop('body')
  )(req)

  // check to make sure require fields are present in the body
  const missingFields = checkRequiredFields(
    ['name', 'placeOfBirth', 'birthDate'],
    body
  )

  if (not(isEmpty(missingFields))) {
    return next(
      new HTTPError(
        400,
        `Missing Required Fields: ${join(', ', missingFields)}`
      )
    )
  }

  addAuthor(body, function(err, addResult) {
    if (err) return next(new HTTPError(err.status, err.message))
    res.status(201).send(addResult)
  })
})

app.put('/authors/:id', function(req, res, next) {
  if (isEmpty(prop('body', req))) {
    return next(
      new HTTPError(
        400,
        'Missing request body. Content-Type header should be application/json.'
      )
    )
  }
  const missingFields = checkRequiredFields(
    ['_id', '_rev', 'name', 'type', 'placeOfBirth', 'birthDate'],
    prop('body', req)
  )
  if (not(isEmpty(missingFields))) {
    return next(
      new HTTPError(
        400,
        `Missing Required Fields: ${join(', ', missingFields)}`
      )
    )
  }

  updateAuthor(prop('body', req), function(err, updateResult) {
    if (err) return next(new HTTPError(err.status, err.message))
    res.status(200).send(updateResult)
  })
})

// get a author GET /authors/id
app.get('/authors/:id', function(req, res, next) {
  getAuthor(req.params.id, function(err, doc) {
    if (err) return next(new HTTPError(err.status, err.message))
    res.status(200).send(doc)
  })
})

app.delete('/authors/:id', function(req, res, next) {
  deleteAuthor(req.params.id, function(err, doc) {
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
