/*
Helper functions for the blog list.
*/
const _ = require('lodash')

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
    return blogs.reduce((max, blog) => max.likes > blog.likes ? max : blog, {})
}

const mostBlogs = (blogs) => {
    const groupedByAuthor = _.groupBy(blogs, 'author');
    console.log("groupedByAuthor: ", groupedByAuthor)
    const authorWithMostEntries = _.maxBy(Object.keys(groupedByAuthor),
        author => groupedByAuthor[author].length);
    console.log("authorWithMostEntries: ", authorWithMostEntries)

    if (authorWithMostEntries === undefined) {
        return {}
    }
    else {
        return ({
            author: authorWithMostEntries,
            blogs: groupedByAuthor[authorWithMostEntries].length
        })
    }
}

module.exports = {
    dummy, totalLikes, favoriteBlog, mostBlogs
}