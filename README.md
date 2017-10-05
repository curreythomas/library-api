# Library API

An api to manage books and their authors

## Getting Started

This section is intended for software developers. If you have rights to the repo, simply clone the repo. If you do not have rights to the repo, you may fork the repo and clone your fork.

```
$ git clone <clone url>
$ cd library-api
$ npm install
```

### Environment Variables

You'll need to create a local **.env** file to store your applications secrets. Follow these steps to generate and store the secrets.

0. Create a `COUCH_URL` environment variable: Using Cloudant for example or a local instance of CouchDB, create and API key for the database. Store the key and password within your **.env** file. Use the key and password to create an environment variable named `COUCH_URL` using this pattern `COUCH-URL=https://<key>:<password@<your base url>/`.

  **Example**

  ```
  COUCH-URL=https://<key>:<password@<your base url>/
  ```

0. Create a `PORT` environment variable used by the client application to connect and communicate with your api.   

  **Example**

  ```
  PORT=4000
  ```

0. Create a `COUCH_DATABASE` environment variable. The name of the database.

**Example**
```
COUCH_DATABASE=library-api
```

### Starting the api

Run the following command to start the api on localhost:4000.

```
$ npm start
```

## Endpoints
CRUDL
/books
/authors

## books
## Create a book - `POST /books`

Add a book to the collection of books by providing a new book resource in the request body.

**Example**

```
POST /books

{
  "title": "A Brave New World",
  "author": "author_aldous_huxley",
  "type": "book",
  "publisher": "Penguin Books",
  "ISBN": "9780060850524",
  "genre": "fiction",
  "description": "Brave New World is a novel written in 1931 by Aldous Huxley, and published in 1932. Set in London in the year AD 2540, the novel anticipates developments in reproductive technology, sleep-learning, psychological manipulation, and classical conditioning that are combined to make a profound change in society.",
  "rating": 95,
  "prices": [
    {"type": "paperback", "price": 9.99},
    {"type": "hardcover", "price": 19.99},
    {"type": "audio", "price": 19.99},
    {"type": "kindle", "price": 12.99}
    ]
}

```

Response 200

```
{
  "ok": true,
  "id": "book_brave_new_world",
  "rev": "1"

}
```

## Get a book - `GET /books/{id}`

Retrieves a single book by the book `{id}` route parameter.

### Route Parameters
 - `id` - used to identify a book in the collection of books.

## Update a book - `PUT /books/{id}`

Updates a single book by the book `{id}`route parameter.

## List the books - `GET /books`




## /authors
