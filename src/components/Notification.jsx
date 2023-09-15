import PropTypes from 'prop-types'

const Notification = ({ message }) => {

  const infoNotification = {
    color: 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  const errorNotification = {
    color: 'red',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  if (message.type === '') {
    return null
  }
  else if (message.type === 'info') {
    return <div style={infoNotification}>{message.text}</div>
  }
  else if (message.type === 'error') {
    return <div className='error' style={errorNotification}>{message.text}</div>
  }
}

Notification.propTypes = {
  message: PropTypes.object.isRequired,
}

export default Notification