import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({
  blogData,
  incrementLikesHandler,
  removeBlogHandler }) => {

  const [detailedView, setdetailedView] = useState(false)

  const componentStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const incrementLikes = () => {
    incrementLikesHandler(blogData)
  }

  const removeBlog = () => {
    if (window.confirm(`Remove blog "${blogData.title}" by ${blogData.author}?`)) {
      removeBlogHandler(blogData)
    }
  }

  return (
    <div className="blog" style={componentStyle} key={blogData.title}>
      <div>
        <div>
          {blogData.title}, by {blogData.author} &nbsp;
          <button className="view-blog-details-button"
            onClick={() => setdetailedView(!detailedView)}>
            {detailedView ? 'hide' : 'view'}</button>
        </div>
        {detailedView ?
          <div id="blog-details">
            <p><a href={'//' + blogData.url} target="_blank" rel="noreferrer">
              {blogData.url}</a></p>
            <p>likes {blogData.likes}
              <button className="like-blog-button"
                onClick={incrementLikes}>like</button></p>
            <p>{blogData.user.name}</p>
            {JSON.parse(window.localStorage.getItem('loggedInAppUser')).username ===
              blogData.user.username ?
              <button className="remove-blog-button" onClick={removeBlog}>remove</button>
              : null}
          </div>
          : null}
      </div>
    </div>
  )
}

Blog.propTypes = {
  incrementLikesHandler: PropTypes.func.isRequired,
  removeBlogHandler: PropTypes.func.isRequired,
  blogData: PropTypes.object.isRequired,
}

export default Blog