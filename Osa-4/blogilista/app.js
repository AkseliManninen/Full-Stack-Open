const http = require('http')
const express = require('express')
const cors = require('cors')
const config = require('./utils/config')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')

const app = express()

app.use(cors())

app.use(express.json())

app.use('/api/blogs', blogsRouter)

app.use('/api/users', usersRouter)

module.exports = app