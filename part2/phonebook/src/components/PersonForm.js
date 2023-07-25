
const PersonForm = ({nameInput, nameHandlerFunction, numberInput, 
                     numberHandlerFunction, submitEventHandler}) => {
    return (
        <form onSubmit={submitEventHandler}>
            <div>
                name: <input value={nameInput} onChange={nameHandlerFunction}/>
            </div>
            <div>
                number: <input value={numberInput} onChange={numberHandlerFunction}/>
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}

export default PersonForm