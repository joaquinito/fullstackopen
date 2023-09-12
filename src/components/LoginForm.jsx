
const LoginForm = ({ usernameChangeHandler, passwordChangeHandler,
    submitEventHandler }) => {

    return (
        <div>
            <form onSubmit={submitEventHandler}>
                <div>
                    username <input
                        onChange={({ target }) => usernameChangeHandler(target.value)} />
                </div>
                <div>
                    password <input type="password"
                        onChange={({ target }) => passwordChangeHandler(target.value)} />
                </div>
                <div>
                    <button type="submit">login</button>
                </div>
            </form>
        </div>
    )
}

export default LoginForm