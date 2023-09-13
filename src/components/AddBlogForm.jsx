import { useState } from 'react'
import PropTypes from 'prop-types'

const AddBlogForm = ({ submitEventHandler }) => {

  const [newBlogTitle, setNewBlogTitle] = useState('')
  const [newBlogAuthor, setNewBlogAuthor] = useState('')
  const [newBlogUrl, setNewBlogUrl] = useState('')

  const createNewBlog = (event) => {
    event.preventDefault() // prevents page reload
    const newBlog = {
      title: newBlogTitle,
      author: newBlogAuthor,
      url: newBlogUrl
    }
    setNewBlogTitle('')
    setNewBlogAuthor('')
    setNewBlogUrl('')
    event.target.reset() // clears the form fields
    submitEventHandler(newBlog)
  }

  return (
    <div>
      <h2>add new blog</h2>
      <form onSubmit={createNewBlog}>
        <div>
          title: <input onChange={({ target }) => setNewBlogTitle(target.value)} />
        </div>
        <div>
          author: <input onChange={({ target }) => setNewBlogAuthor(target.value)} />
        </div>
        <div>
          url: <input onChange={({ target }) => setNewBlogUrl(target.value)} />
        </div>
        <div>
          <button type="submit">create</button>
        </div>
      </form>
    </div>
  )
}

AddBlogForm.propTypes = {
  submitEventHandler: PropTypes.func.isRequired,
}

export default AddBlogForm