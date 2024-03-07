
const FindCountryForm = ({textInput, inputHandlerFunction}) => {
    return (
        <div>
            find countries <input value={textInput} onChange={inputHandlerFunction}/>
        </div>
    )
}

export default FindCountryForm