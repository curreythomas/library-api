// build an _id prop that take the title of the book and does the following:
// such as "title": "A Brave New World"
// transform it into "book_brave_new_world"
// require ramda
// lower case
// strip off the A or The if it is the first word
// concatenate the word "book_"
// replace the spaces with underscores

// prefix = "book_"
//value = "A Brave New World"
// return value => "book_brave_new_world"

const {
  compose,
  toLower,
  concat,
  join,
  dropWhile,
  contains,
  split,
  drop,
  head
} = require('ramda')

const removeArticles = arrData =>
  contains(head(arrData), ['the', 'a']) ? drop(1, arrData) : arrData

module.exports = (prefix, joiner, value) =>
  compose(
    concat(prefix + joiner),
    join(joiner),
    removeArticles,
    split(' '),
    toLower()
  )(value)
