import { useState, useEffect, useRef } from 'react'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import AddBlogForm from './components/AddBlogForm'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [notificationMessage, setNotificationMessage] = useState({ type: '', text: '' })
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState([])
  const addBlogFormRef = useRef()

  // Effect hook to get all blogs.
  // In order to user async/await in an effect hool, we need to define an async function
  // inside the effect hook. This is because the effect hook cannot be async by itself.
  useEffect(() => {
    const getBlogs = async () => {
      const blogs = await blogService.getAll()
      setBlogs(blogs.sort((a, b) => b.likes - a.likes))
    }
    getBlogs().catch(console.error)
  }, [])

  // Effect hook to check if user has already logged in
  useEffect(() => {
    const loggedInUserJSON = window.localStorage.getItem('loggedInAppUser')
    if (loggedInUserJSON) {
      const user = JSON.parse(loggedInUserJSON)
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
        'loggedInAppUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)

      setUser(user)
      setUsername('')
      setPassword('')
    }
    catch (exception) {
      setNotificationMessage({
        type: 'error',
        text: 'Wrong credentials'
      })
      setTimeout(() => setNotificationMessage({ type: '', text: '' }), 3000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedInAppUser')
    setUser(null)
  }

  const handleAddNewBlog = async (newBlog) => {

    try {
      const blog = await blogService.add(newBlog)
      const blogs = await blogService.getAll()
      setBlogs(blogs.sort((a, b) => b.likes - a.likes))

      addBlogFormRef.current.toggleVisibility()

      setNotificationMessage({
        type: 'info',
        text: `Blog '${blog.title}' by ${blog.author} added`
      })
      setTimeout(() => setNotificationMessage({ type: '', text: '' }), 5000)
    }
    catch (exception) {
      setNotificationMessage({
        type: 'error',
        text: 'Error adding blog'
      })
      setTimeout(() => setNotificationMessage({ type: '', text: '' }), 5000)
    }
  }

  const handleIncrementLikes = async (blog) => {

    try {
      const updatedData = {
        ...blog,
        likes: blog.likes + 1
      }
      await blogService.update(blog.id, updatedData)
      const blogs = await blogService.getAll()
      setBlogs(blogs.sort((a, b) => b.likes - a.likes))
    }
    catch (exception) {
      setNotificationMessage({
        type: 'error',
        text: 'Error updating blog'
      })
      setTimeout(() => setNotificationMessage({ type: '', text: '' }), 5000)
    }
  }

  const handleRemoveBlog = async (blog) => {

    try {
      await blogService.remove(blog.id)
      const blogs = await blogService.getAll()
      setBlogs(blogs.sort((a, b) => b.likes - a.likes))
    }
    catch (exception) {
      setNotificationMessage({
        type: 'error',
        text: 'Error removing blog'
      })
      setTimeout(() => setNotificationMessage({ type: '', text: '' }), 5000)
    }
  }

  if (user === null) {
    return (
      <div>
        <h2> log in to application </h2>
        <Notification message={notificationMessage} />
        <LoginForm usernameChangeHandler={setUsername} passwordChangeHandler={setPassword}
          submitEventHandler={handleLogin} />
      </div>
    )
  }
  else {
    return (
      <div>
        <h2>blogs</h2>
        <Notification message={notificationMessage} />
        <div>
          {user.name} logged in &nbsp;
          <button onClick={handleLogout}>logout</button>
        </div>
        <br />
        <Togglable buttonLabel='new blog' ref={addBlogFormRef}>
          <AddBlogForm submitEventHandler={handleAddNewBlog} />
        </Togglable>
        <br />
        {blogs.map(blog => <Blog blogData={blog} incrementLikesHandler={handleIncrementLikes}
          removeBlogHandler={handleRemoveBlog} key={blog.title} />)}
      </div>
    )
  }
}

export default App