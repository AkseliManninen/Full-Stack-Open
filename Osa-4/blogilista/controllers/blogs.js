const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
  .find({}).populate('user', {username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.post('/', async (request, response, next) => {
  const body = request.body

  console.log("router post")

  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }
  const user = await User.findById(decodedToken.id)

  if (!body.title || !body.url) {
    return response.status(400).json({error: "Title and url are required"})
  }
  
  if (!body.likes) {
    body.likes = 0
  }
  
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  return response.status(200).json({error: "Succesfully posted"})
})

blogsRouter.delete('/:id', async (request, response, next) => {
  try {
    const id = request.params.id
    const decodedToken = jwt.verify(request.token, process.env.SECRET)

    if (!decodedToken.id) {
      return response.status(401).json({ error: 'token invalid' })
    }

    const deletedBlog = await Blog.findById(id)

    if (!deletedBlog) {
      return response.status(404).json({ error: 'Id not found' })
    }

    if (deletedBlog.user.toString() !== decodedToken.id) {
      return response.status(403).json({ error: 'Only the creator can delete the blog' })
    }

    await Blog.findByIdAndRemove(id)

    response.status(204).end()
  } catch (error) {
    next(error)
  }
})

blogsRouter.put('/:id', async (request, response, next) => {
  const id = request.params.id
  const updatedLikes = request.body.likes

  try {
    const originalBlog = await Blog.findById(id)

    if (!originalBlog) {
      return response.status(404).json({ error: 'blog with the id was not found' })
    }

    originalBlog.likes = updatedLikes

    const updatedBlog = await originalBlog.save()

    response.json(updatedBlog)

    return response.status(200).json({error: "Succesfully put"})
  } catch (error) {
    next(error)
  }
})

module.exports = blogsRouter