/*
Definition of the Mongoose schema for a blog.
*/

const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
    url: { type: String, required: true },
    title: { type: String, required: true },
    author: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    likes: { type: Number, default: 0 }
})

// Change _id to id and remove __v (these are MongoDB default properties)
blogSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

const Blog = mongoose.model('Blog', blogSchema)

module.exports = Blog
