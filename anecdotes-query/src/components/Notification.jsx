import { useContext } from "react"
import NotificationContext from "../NotificationContext"

const Notification = () => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }

  const [notificationText, notificationDispatch] = useContext(NotificationContext)

  if (notificationText !== '') {
    return (
      <div style={style}>
        {notificationText}
      </div>
    )
  }
  else {
    return null
  }
}

export default Notification