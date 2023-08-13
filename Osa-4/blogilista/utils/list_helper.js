const dummy = (blogs) => {
    return(1)
  }

  const totalLikes = (blogs) => {
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
  
  module.exports = {
    dummy, 
    totalLikes,
    favoriteBlog
  }