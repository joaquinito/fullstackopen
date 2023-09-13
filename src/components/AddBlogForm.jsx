const AddBlogForm = ({ titleChangeHandler, authorChangeHandler, urlChangeHandler,
    submitEventHandler }) => {

    return (
        <div>
            <h2>add new blog</h2>
            <form onSubmit={submitEventHandler}>
                <div>
                    title: <input onChange={({ target }) => titleChangeHandler(target.value)} />
                </div>
                <div>
                    author: <input onChange={({ target }) => authorChangeHandler(target.value)} />
                </div>
                <div>
                    url: <input onChange={({ target }) => urlChangeHandler(target.value)} />
                </div>
                <div>
                    <button type="submit">create</button>
                </div>
            </form>
        </div>
    )
}

export default AddBlogForm