const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app.js')
const User = require('../models/user')


const api = supertest(app)

const initialUsers = []

beforeEach(async () => {
  await User.deleteMany({})
})

test('username must be defined', async () => {
  const newUser = {
    "name": "U1",
    "password": "123"
  }

  const response = await api
    .post('/api/users')
    .send(newUser)
    .expect(400)
})

test('name must be defined', async () => {
    const newUser = {
      "username": "U1",
      "password": "123"
    }
  
    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
})

afterAll(async () => {
  await mongoose.connection.close()
})