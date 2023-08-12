const http = require('http')
const express = require('express')
const cors = require('cors')
const config = require('./utils/config')
const blogsRouter = require('./controllers/blogs')

const app = express()

app.use(cors())

app.use(express.json())

app.use('/api/blogs', blogsRouter)

app.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`)
})