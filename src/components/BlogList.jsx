const BlogList = ({ blogs }) => {

    return (
        <div>
            {blogs.map(blog => (
                <div key={blog.title}>
                    <a href={'//'+blog.url} target="_blank" rel="noreferrer">
                        {blog.title}</a>, by {blog.author}
                </div>
            ))}
        </div>
    )
}

export default BlogList