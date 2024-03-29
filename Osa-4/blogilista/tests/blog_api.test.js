const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app.js')
const Blog = require('../models/blog')


const api = supertest(app)

const initialBlogs = [
  {
    "title": "My first blog",
    "author": "Author 1",
    "url": "b1.fi",
    "likes": 2
  },
  {
    "title": "My second blog",
    "author": "Author 2",
    "url": "b2.fi",
    "likes": 9
  },
    {
    "title": "My third blog",
    "author": "Author 3",
    "url": "b3.fi",
    "likes": 12
  }
]

beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[1])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[2])
  await blogObject.save() 
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('there are three blogs', async () => {
  const response = await api
    .get('/api/blogs')
  expect(response.body).toHaveLength(3)
})

test('identification field is id', async () => {
  const response = await api
    .get('/api/blogs')
  
  response.body.forEach(blog => {
    expect(blog.id).toBeDefined()
  })
})

test('a valid blog can be added ', async () => {
  const newBlog = {
      "title": "Test adding blogs",
      "author": "Test author",
      "url": "test.fi",
      "likes": 2
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')

  const contents = response.body.map(r => r.title)

  expect(response.body).toHaveLength(initialBlogs.length + 1)
  expect(contents).toContain("Test adding blogs")
})

test('default likes is 0 if likes are not defined', async () => {
  const newBlog = {
    "title": "Test blog without likes",
    "author": "Test author",
    "url": "test.fi"
  }

  const response = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  expect(response.body.likes).toBe(0)
})

test('title must be defined', async () => {
  const newBlog = {
    "author": "Test author",
    "url": "test.fi"
  }

  const response = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
})

test('url must be defined', async () => {
  const newBlog = {
    "title": "Title",
    "author": "Test author",
  }

  const response = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
})


test('deleting a blog', async () => {
  const newBlog = new Blog({
    title: 'Test delete a blog',
    author: 'Test Author',
    url: 'test.fi',
    likes: 0,
  });
  const savedBlog = await newBlog.save()

  await api
    .delete(`/api/blogs/${savedBlog.id}`)
    .expect(204)

    const deletedBlog = await Blog.findById(savedBlog.id);
    expect(deletedBlog).toBeNull()
})

test('deleting a blog with an id that does not exists returns 404', async () => {
  await api
    .delete('/api/blogs/123212321')
    .expect(404)
})

test('updating likes of a blog', async () => {
  const blogs = await api.get('/api/blogs')
  const firstBlog= blogs.body[0]
  const updatedLikes = 100

  const updatedBlog = { ...firstBlog, likes: updatedLikes }

  await api
    .put(`/api/blogs/${firstBlog.id}`)
    .send(updatedBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const blogsAfterUpdate = await api.get('/api/blogs')
  const updatedBlogAfterUpdate = blogsAfterUpdate.body.find(blog => blog.id === firstBlog.id)

  expect(updatedBlogAfterUpdate.likes).toBe(100)
})

afterAll(async () => {
  await mongoose.connection.close()
})