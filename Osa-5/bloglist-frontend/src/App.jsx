import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null) 
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  const [newBlogTitle, setNewBlogTitle] = useState('')
  const [newBlogAuthor, setNewBlogAuthor] = useState('')
  const [newBlogURL, setNewBlogURL] = useState('')

    useEffect(() => {
        blogService.getAll().then(blogs =>
        setBlogs( blogs )
        )  
    }, [])

    // effect hook sisäänkirjautumisen tarkistamiseen
    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedUser')
        if (loggedUserJSON) {
          const user = JSON.parse(loggedUserJSON)
          setUser(user)
          blogService.setToken(user.token)
        }
      }, [])

    const handleLogin = async (event) => {
        event.preventDefault()
        
        try {
        const user = await loginService.login({
            username, password,
        })

        window.localStorage.setItem(
            'loggedUser', JSON.stringify(user)
          )

        blogService.setToken(user.token)
        setUser(user)
        setUsername('')
        setPassword('')
        } catch (exception) {
        setErrorMessage('wrong username or password')
        setTimeout(() => {
            setErrorMessage(null)
        }, 5000)
        }
    }

    const addBlog = (event) => {
        event.preventDefault()
        const auth = user.token
        const newBlog = {
            title: newBlogTitle,
            author: newBlogAuthor,
            url: newBlogURL,
        }

        blogService
        .create(newBlog, auth)
        .then(blog => {
          setBlogs(blogs.concat(blog))
          setSuccessMessage(`A new blog ${newBlogTitle} by ${newBlogAuthor} added`)
          setTimeout(() => {
            setSuccessMessage(null)
          }, 5000)
        })
        .catch((exception) => {
          setErrorMessage('Add all necessary information')
          setTimeout(() => {
            setErrorMessage(null);
          }, 5000)
        })
    }

    // poistaa tokenin uloskirjautuessa
    const handleResetToken = () => {
        localStorage.removeItem('loggedUser')
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

    // ehdollinen renderöinti
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
        <Notification message={errorMessage} type ="error"/>
        <p>{user.name} logged in
        <button onClick={handleResetToken}>logout</button>
        </p>
        <h2>create new</h2>
        <form onSubmit={addBlog}>
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