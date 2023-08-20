const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', (request, response) => {
  Blog.find({}).then(blogs => {
    response.json(blogs)
  })
})

blogsRouter.post('/', (request, response, next) => {
  const body = request.body

  if (!body.title || !body.url) {
    return response.status(400).json({error: "Title and url are required"})
  }
  
  if (!body.likes) {
    body.likes = 0
  }
  
  const blog = new Blog(body)

  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
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

module.exports = blogsRouter