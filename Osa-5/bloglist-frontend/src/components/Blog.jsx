import { useState } from 'react'

const Blog = ({ blog, addLike, removeBlog, user }) => {
  const [blogInfoVisible, setBlogInfoVisible] = useState(false)
  const hideWhenVisible = { display: blogInfoVisible ? 'none' : '' }
  const showWhenVisible = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
    display: blogInfoVisible ? '' : 'none' 
  }

  // PropTypes
  Blog.propTypes = {
    addLike: PropTypes.func.isRequired,
    removeBlog: PropTypes.func.isRequired,
  }

  const handleAddLike = () => {
    console.log("Adding a like")
    const blogMoreLikes = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
    }
    console.log("Passing to addLike function")
    addLike(blog.id, blogMoreLikes)
  }

  const handleRemoveBlog = () => {
    if(window.confirm(`Remove blog ${blog.title} by ${blog.author}`)){
      console.log("Removing a blog")
      removeBlog(blog.id)
    }
  }

  const deleteButton = () => {
    if (user && blog.user && blog.user.name === user.name) {
      return (
        <div>
          <button type="button" onClick={handleRemoveBlog} id='remove-button'>remove</button>
        </div>
      )
    }
  }

  return(
    <div>
      <div style={hideWhenVisible}>
        {blog.title} {blog.author} 
        <button type="button" onClick={() => setBlogInfoVisible(true)}>view</button>
      </div> 
      <div style={showWhenVisible}>
        {blog.title} {blog.author} 
        <button type="button" onClick={() => setBlogInfoVisible(false)}>hide</button>
        <div>{blog.url}</div>
        <div>
          likes {blog.likes}
          <button type="button" onClick = {handleAddLike}>like</button>
        </div>
        <div>{blog.user ? blog.user.name : "Unknown User"}</div>
        {deleteButton()}
      </div>
  </div>  
  )
}

export default Blog