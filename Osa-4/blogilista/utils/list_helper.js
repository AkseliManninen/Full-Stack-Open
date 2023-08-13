const dummy = (blogs) => {
    return(1)
  }

const totalLikes = (blogs) => {
  if (blogs.length === 0) {
    return 0
  }
  const sum = (subtotal, blog) => {
    return subtotal + blog.likes
  }
  return blogs.reduce(sum, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return null
  }

  let maxLikes = 0;
  let favorite = null

  blogs.forEach((blog) => {
    if (blog.likes > maxLikes) {
      maxLikes = blog.likes;
      favorite = blog
    }
  })

  return favorite;
}

const _ = require('lodash')

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return null
  }

  const blogsByAuthors = _.countBy(blogs, 'author')
  const mostBlogsAuthor = _.maxBy(Object.keys(blogsByAuthors), (author) => blogsByAuthors[author])

  return {
    author: mostBlogsAuthor,
    blogs: blogsByAuthors[mostBlogsAuthor],
  }
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return null
  }

  const authorLikes = _.groupBy(blogs, 'author')
  const authorTotalLikes = _.mapValues(authorLikes, (blogs) => _.sumBy(blogs, 'likes'))
  const mostLikesAuthor = _.maxBy(Object.keys(authorTotalLikes), (author) => authorTotalLikes[author])

  return {
    author: mostLikesAuthor,
    likes: authorTotalLikes[mostLikesAuthor],
  }
}
  
  module.exports = {
    dummy, 
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
  }