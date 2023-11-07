import { useState } from 'react'

const Blog = ({ blog }) => {
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

  return(
    <div>
      <div style={hideWhenVisible}>
        {blog.title}
        <button type="button" onClick={() => setBlogInfoVisible(true)}>view</button>
      </div> 
      <div style={showWhenVisible}>
        {blog.title} {blog.author} 
        <button type="button" onClick={() => setBlogInfoVisible(false)}>hide</button>
        <div>{blog.url}</div>
        <div>
          likes {blog.likes}
          <button type="button">like</button>
        </div>
        <div>{blog.user ? blog.user.name : "Unknown User"}</div>
      </div>
  </div>  
  )
}

export default Blog