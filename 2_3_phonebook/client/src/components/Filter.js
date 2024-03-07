
const Filter = ({text, handlerFunction}) => {
    return(
        <div>
            filter shown with <input value={text} onChange={handlerFunction}/>
        </div>
    )
}

export default Filter