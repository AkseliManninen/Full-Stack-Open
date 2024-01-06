import { useState } from 'react'
import { PropTypes } from 'prop-types'

const BlogForm = ({ createBlog }) => {
  const [newBlogTitle, setNewBlogTitle] = useState('')
  const [newBlogAuthor, setNewBlogAuthor] = useState('')
  const [newBlogURL, setNewBlogURL] = useState('')
  const [blogFormVisible, setBlogFormVisible] = useState(false)

  const addBlog = async (event) => {
    console.log('Trying to add a blog')
    event.preventDefault()
    const newBlog= {
      title: newBlogTitle,
      author: newBlogAuthor,
      url: newBlogURL,
    }
    createBlog(newBlog)
  }

  // PropTypes
  BlogForm.propTypes = {
    createBlog: PropTypes.func.isRequired,
    blogFormVisible: PropTypes.bool.isRequired
  }

  const hideWhenVisible = { display: blogFormVisible ? 'none' : '' }
  const showWhenVisible = { display: blogFormVisible ? '' : 'none' }

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={() => setBlogFormVisible(true)}>new blog</button>
      </div>
      <div style={showWhenVisible} className = "formDiv">
        <h2>create new</h2>
        <form onSubmit={addBlog}>
          <div>
            title: <input id = "title" value={newBlogTitle} onChange={event => setNewBlogTitle(event.target.value)} placeholder='write title'/>
          </div>
          <div>
            author: <input id = "author" value={newBlogAuthor} onChange={event => setNewBlogAuthor(event.target.value)} placeholder='write author'/>
          </div>
          <div>
            url: <input id = "url" value={newBlogURL} onChange={event => setNewBlogURL(event.target.value)} placeholder='write url'/>
          </div>
          <button id = "create-button" type="submit">create</button>
          <div>
            <button type="button" onClick={() => setBlogFormVisible(false)}>cancel</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default BlogForm