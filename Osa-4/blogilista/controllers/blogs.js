const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', (request, response) => {
  Blog.find({}).then(blogs => {
    response.json(blogs)
  })
})

blogsRouter.post('/', async (request, response, next) => {
  const body = request.body

  const user = await User.findById(body.userId)

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
})

blogsRouter.delete('/:id', async (request, response, next) => {
  try {
    const id = request.params.id
    const deletedBlog = await Blog.findByIdAndRemove(id)

    response.status(204).end()
  } catch (error) {
    response.status(404).json({ error: 'Id not found' })
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
  } catch (error) {
    next(error)
  }
})

module.exports = blogsRouter