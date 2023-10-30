import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null) 

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )

    // Tarkistaa, jos local storagessa on jo token käyttäjälle
    const storedToken = localStorage.getItem('token')
    const storedName = localStorage.getItem('name');

    if (storedToken) {
      console.log(storedToken)
      setUser({ token: storedToken, name: storedName})
    }
    else {
      console.log('No token found')
      setUser(null)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      })

      if (response.ok) {
        const data = await response.json()
        setUser(data)

        localStorage.setItem('token', data.token)
        localStorage.setItem('name', data.name)
      } else {
        console.error('Login failed:')
      }
    } catch (exception) {
      console.error('Network error:', exception)
    }
  }

  const handleResetToken = () => {
    localStorage.removeItem('token')
    console.log('Removing token')
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <form onSubmit = {handleLogin}>
          <div>
            username <input
                      value={username}
                      onChange={(event) => setUsername(event.target.value)}/>
          </div>
          <div>
            password <input 
                      value = {password} 
                      onChange = {(event) => setPassword(event.target.value)}/>
          </div>
          <div>
          <button type="submit">login</button>
        </div>
        </form>
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <p>{user.name} logged in
      <button onClick={handleResetToken}>logout</button>
      </p>

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App