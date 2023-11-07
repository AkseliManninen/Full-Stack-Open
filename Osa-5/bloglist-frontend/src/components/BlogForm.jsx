import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [newBlogTitle, setNewBlogTitle] = useState('')
  const [newBlogAuthor, setNewBlogAuthor] = useState('')
  const [newBlogURL, setNewBlogURL] = useState('')
  const [blogFormVisible, setBlogFormVisible] = useState(false)

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

  const hideWhenVisible = { display: blogFormVisible ? 'none' : '' }
  const showWhenVisible = { display: blogFormVisible ? '' : 'none' }
  
    return (
    <div>
      <div style={hideWhenVisible}>
          <button onClick={() => setBlogFormVisible(true)}>new note</button>
      </div>
      <div style={showWhenVisible}>
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
            <div>
              <button type="button" onClick={() => setBlogFormVisible(false)}>cancel</button>
            </div>
        </form>
      </div>
    </div>
    )
  }

export default BlogForm