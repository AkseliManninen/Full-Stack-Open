import { useState } from 'react'

const Blog = ({ blog }) => {
  const [blogInfoVisible, setBlogInfoVisible] = useState(false)

  return(
  <div>
    {blog.title} {blog.author}
  </div>  
  )
}

export default Blog