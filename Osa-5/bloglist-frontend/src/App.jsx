import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null) 
  const [newBlogTitle, setNewBlogTitle] = useState('');
  const [newBlogAuthor, setNewBlogAuthor] = useState('');
  const [newBlogURL, setNewBlogURL] = useState('');
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

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

  // sisäänkijrautuminen
  const handleLogin = (event) => {
    event.preventDefault();
  
    fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Wrong username or password');
        }
      })
      .then((data) => {
        setUser(data);
        console.log('Login successful');
        localStorage.setItem('token', data.token);
        localStorage.setItem('name', data.name);
      })
      .catch((error) => {
        setErrorMessage(error.message);
        console.error('Login failed:', error);
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
      });
  };
  
  // Lisää uuden blogin
  const handleAddBlog = (event) => {
    event.preventDefault()
  
    const newBlog = {
      title: newBlogTitle,
      author: newBlogAuthor,
      url: newBlogURL,
      likes: 0,
    }
  
    fetch('/api/blogs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`,
      },
      body: JSON.stringify(newBlog),
    })
      .then((response) => {
        if (response.ok) {
          console.log('Blog added successfully')
          return blogService.getAll()
        } else {
          throw new Error('Give all necessary blog information')
        }
      })
      .then((updatedBlogs) => {
        setBlogs(updatedBlogs)
      })
      .catch((error) => {
        setErrorMessage(error.message)
        console.error('Error:', error)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000);
      })
  }

  const handleResetToken = () => {
    localStorage.removeItem('token')
    console.log('Removing token')
  }

  // komponentti: antaa ilmoituksen
  const Notification = ({ message, type}) => {
    if (message === null) {
      return null
    }

    const className = type === "success" ? "success" : "error"

    return (
      // luokka: divissä annettu success-luokka tyylien lisäämistä varten
      <div className={className}> 
        {message}
      </div>
    )
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification message={errorMessage} type ="error"/>
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
      <Notification message={successMessage} type ="success"/>
      <p>{user.name} logged in
      <button onClick={handleResetToken}>logout</button>
      </p>
      <h2>create new</h2>
      <form onSubmit={handleAddBlog}>
        <div>
        title: <input value={newBlogTitle} onChange={(event) => setNewBlogTitle(event.target.value)} />
        </div>
        <div>
          author: <input value={newBlogAuthor} onChange={(event) => setNewBlogAuthor(event.target.value)} />
        </div>
        <div>
          url: <input value={newBlogURL} onChange={(event) => setNewBlogURL(event.target.value)} />
        </div>
        <button type="submit">create</button>
      </form>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App


