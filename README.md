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

0. Create a `COUCH_URL` environment variable: Using Cloudant for example or a local instance of CouchDB, create and API key for the database. Store the key and password within your **.env** file. Use the key and password to create an environment variable named `COUCH_URL` using this pattern `COUCH_URL=https://<key>:<password@<your base url>/`.

  **Example**

  ```
  COUCH_URL=https://<key>:<password@<your base url>/
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


# Books
## Create a book - `POST /books`

Add a book to the collection of books by providing a new book resource in the request body.

**Example**

```
POST /books

{
  "title": "A Brave New World",
  "author": "author_aldous_huxley",
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

**Example**

```
GET /books/book_brave_new_world
```

**200 Response**

```
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

### Route Parameters
 - `id` - used to identify a book in the collection of books.

## Update a book - `PUT /books/{id}`

Update a book in the collection of books. Supply the book resource to replace the request body. Include the `_id` and `_rev` key in the resource. The following fields are required:

-`_id`
-`_rev`
-`type`
-`title`
-`author`
-`ISBN`
-`genre`
-`description`

**Example**






**200 Response***

```
{
  "ok": true,
  "id": "book_brave_new_world",
  "rev": "1"

}
```

## Delete a book - `DELETE /books/{id}`

Deletes a single book using the book `{id}`route parameter.

**Example**

```
DELETE /books/book_brave_new_world
```

**Response 200**

```
{
  "ok": true,
  "id": "book_brave_new_world"
  "rev": "2"
}
```


## List the books - `GET /books`




# Authors

## Create and Author = `POST /authors`

Add an author to the collection of authors by providing a new author resource in the request body. The following fields are required:

- `name`
- `placeOfBirth`
- `birthDate`

**Example**

```
POST /author

{
  "name": "Aldous Huxley",
  "placeOfBirth": "London",
  "birthDate": "1932-05-01"
}
```

**Response 200**

```
{
  "ok": "true"
  "author": "author_aldous_huxley"
  "rev": "1"
}
```


## Get an Author - `GET /authors/{id}`

Retrieves a single author by the author `{id}` route parameter.

**Example**

```
GET /author/author_aldous_huxley

{
  "_id": "author_aldous_huxley"
  "_rev": "1-DASKLF43905U30FJO034234JOD320"
  "type": "author"
  "name": "Aldous Huxley",
  "placeOfBirth": "London",
  "birthDate": "1932-05-01"
}
```

**200 Response**

```
{
  "ok": "true"
  "author": "author_aldous_huxley"
  "rev": "1"
}
```

### Route Parameters
 - `id` - used to identify an author in the collection of authors.


## Update an Author- `PUT /authors/{id}`

Update an author in the collection of authors. Supply the author resource to replace the request body. Include the `_id` and `_rev` key in the resource. The following fields are required:

 -`_id`
 -`_rev`
 -`type`
 -`name`
 -`author`
 -`placeOfBirth`
 -`birthDate`


**Example**

```
PUT /authors
{
  "_id": "author_aldous_huxley",
  "_rev": "1-DASKLF43905U30FJO034234JOD320",
  "type": "author",
  "name": "Aldous Huxley",
  "placeOfBirth": "London",
  "birthDate": "1932-05-01"
}
```

**200 Response***

```
{
  "ok": true,
  "id": "book_brave_new_world",
  "rev": "1"

}
```

## Delete an Author - `DELETE /authors/{id}`

Deletes a single author using the author `{id}`route parameter.

**Example**

```
DELETE /author/author_aldous_huxley

{
  "_id": "author_aldous_huxley",
  "_rev": "1-DASKLF43905U30FJO034234JOD320",
  "type": "author",
  "name": "Aldous Huxley",
  "placeOfBirth": "London",
  "birthDate": "1932-05-01"
}

```

**Response 200**

```
{
  "ok": true,
  "id": "author_aldous_huxley"
  "rev": "2"
}
```


## List the authors - `GET /authors`
