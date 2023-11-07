import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [newBlogTitle, setNewBlogTitle] = useState('')
  const [newBlogAuthor, setNewBlogAuthor] = useState('')
  const [newBlogURL, setNewBlogURL] = useState('')

  const addBlog = async (event) => {
    console.log("Trying to add a blog")
    event.preventDefault()
    const newBlog= {
        title: newBlogTitle,
        author: newBlogAuthor,
        url: newBlogURL,
    }
    createBlog(newBlog)
  } 

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
          <div>
          title: <input value={newBlogTitle} onChange={event => setNewBlogTitle(event.target.value)} />
          </div>
          <div>
          author: <input value={newBlogAuthor} onChange={event => setNewBlogAuthor(event.target.value)} />
          </div>
          <div>
          url: <input value={newBlogURL} onChange={event => setNewBlogURL(event.target.value)} />
          </div>
          <button type="submit">create</button>
      </form>
    </div>
    )
  }

export default BlogForm