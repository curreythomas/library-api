const { difference, keys } = require('ramda')
module.exports = (requiredKeys, body) => difference(requiredKeys, keys(body))

// check to make sure required fields are present in the request body
// if any of the required keys are missing, then send back an array of missing fields
