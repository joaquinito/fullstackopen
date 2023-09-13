import { useState } from "react"

const Blog = ({ blogData, incrementLikesHandler }) => {

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
                        <p>likes {blogData.likes} <button onClick={incrementLikes}>like</button></p>
                        <p>{blogData.user.name}</p>
                    </div>
                    : null}
            </div>
        </div>
    )
}

export default Blog