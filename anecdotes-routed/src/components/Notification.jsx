
const Notification = ({ notification }) => {

  const defaultStyle = {
    marginTop: 10,
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  let style = {}

  if (notification === '' || notification === undefined) {
    style = {
      display: 'none'
    }
  }
  else {
    style = defaultStyle
  }

  return (
    <div style={style}>
      <i>{notification}</i>
    </div>
  )
}

export default Notification