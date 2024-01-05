import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  const [updateBlogs, setUpdateBlogs] = useState(false)

  // effect hook blogien hakemista varten
  useEffect(() => {
    console.log('Fetching all blogs')
    blogService.getAll().then(blogs =>
      setBlogs( blogs.sort() ))  }, [updateBlogs])

  // effect hook sisäänkirjautumisen tarkistamiseen
  useEffect(() => {
    console.log('Checking if login credentials are stored locally')
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    console.log('Trying to log in')
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password, })

      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user))

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)}, 5000)
    }
  }

  // poistaa tokenin uloskirjautuessa
  const handleResetToken = () => {
    localStorage.removeItem('loggedUser')
    console.log('Removing token')}

  // funktio: Lisää uuden blogin
  const addBlog = async (newBlog) => {
    try {
      console.log('Starting creating a blog')
      const blog = await blogService.create(newBlog)
      console.log('Blog created')
      setBlogs(blogs.concat(blog))
      setSuccessMessage(`A new blog ${newBlog.title} by ${newBlog.author} added`)
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
      setUpdateBlogs(!updateBlogs)
    } catch (exception) {
      setErrorMessage('Add all necessary information')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  // funktio: lisää tykkäyksen
  const addLike = async (id, blogMoreLikes) => {
    console.log('Trying to add a like')
    await blogService.update(id, blogMoreLikes)
    console.log('Succesfully added a like')
    setUpdateBlogs(!updateBlogs)
    console.log('Updated bloglist')
  }

  // funktio: poistaa blogin
  const removeBlog = async (removeBlogId) => {
    console.log('Trying to remove a blog')
    await blogService.remove(removeBlogId)
    console.log('Succesfully removed a blog')
    setUpdateBlogs(!updateBlogs)
    console.log('Updated bloglist')
  }

  // komponentti: antaa ilmoituksen
  const Notification = ({ message, type }) => {
    if (message === null) {
      return null
    }

    const className = type === 'success' ? 'success' : 'error'

    return (
    // luokka: divissä annettu success-luokka tyylien lisäämistä varten
      <div className={className}>
        {message}
      </div>
    )
  }

  // ehdollinen renderöinti
  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification message={errorMessage} type ="error"/>
        <form onSubmit = {handleLogin}>
          <div>
            username <input
              id='username'
              value={username}
              onChange={(event) => setUsername(event.target.value)}/>
          </div>
          <div>
            password <input
              id='password'
              value = {password}
              onChange = {(event) => setPassword(event.target.value)}/>
          </div>
          <div>
            <button id="login-button" type="submit">login</button>
          </div>
        </form>
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={successMessage} type ="success"/>
      <Notification message={errorMessage} type ="error"/>
      <p>{user.name} logged in
        <button onClick={handleResetToken}>logout</button>
      </p>
      <BlogForm createBlog={addBlog}/>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} addLike={addLike} removeBlog={removeBlog} user={user}/>
      )}
    </div>
  )
}

export default App



