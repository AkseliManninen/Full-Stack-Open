const mongoose = require('mongoose')

const blogSchema = mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
})

const Blog = mongoose.model('Blog', blogSchema)

const password = process.argv[2]

const mongoUrl = `mongodb+srv://akselimanninen:${password}@cluster0.ma1cb9q.mongodb.net/bloglist?retryWrites=true&w=majority`
mongoose.connect(mongoUrl)

module.exports = Blog