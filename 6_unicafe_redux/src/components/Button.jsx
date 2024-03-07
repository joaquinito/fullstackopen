
const Button = (props) => {
    return (
        <button onClick={props.handlerFunction}>{props.text}</button>
    )
}

export default Button