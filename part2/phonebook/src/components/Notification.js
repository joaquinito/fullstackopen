
const Notification = ({message}) => {

    const infoNotification = {
        color: 'green',
        background: 'lightgrey',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10
    }
    console.log('message: ', message)
    
    if(message.type === ''){
        return null
    }
    else if(message.type === 'info'){
        return <div style={infoNotification}>{message.text}</div>
    }
}

export default Notification