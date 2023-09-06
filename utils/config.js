/*
File for handling of environment variables.
*/

require('dotenv').config()

const PORT = process.env.PORT

// We use the testBloglistApp database if we are running tests,
// otherwise we use the database bloglistApp.
// NODE_ENV is defined in the commands in package.json.
const MONGODB_URI = process.env.NODE_ENV === 'test' ?
    process.env.TEST_MONGODB_URI : process.env.MONGODB_URI

module.exports = {
    MONGODB_URI,
    PORT
}