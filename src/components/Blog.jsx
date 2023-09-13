import { useState } from "react"

const Blog = ({ blogData, incrementLikesHandler, removeBlogHandler }) => {

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
        <div style={componentStyle} key={blogData.title}>
            <div>
                {blogData.title}, by {blogData.author} &nbsp;
                <button onClick={() => setdetailedView(!detailedView)}>
                    {detailedView ? 'hide' : 'view'}</button>
                {detailedView ?
                    <div>
                        <p><a href={'//' + blogData.url} target="_blank" rel="noreferrer">
                            {blogData.url}</a></p>
                        <p>likes {blogData.likes}
                            <button onClick={incrementLikes}>like</button></p>
                        <p>{blogData.user.name}</p>
                        {JSON.parse(window.localStorage.getItem('loggedInAppUser')).username ===
                            blogData.user.username ?
                            <button onClick={removeBlog}>remove</button>
                            : null}
                    </div>
                    : null}
            </div>
        </div>
    )
}

export default Blog