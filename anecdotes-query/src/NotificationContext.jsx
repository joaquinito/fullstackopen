import { createContext, useReducer, useContext } from 'react'

const notificationReducer = (state, action) => {
  console.log('notificationReducer', state, action)
  console.log('action.data', action.data)
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.data
    case 'CLEAR_NOTIFICATION':
      return ''
    default:
      return state
  }
}

const NotificationContext = createContext()

export const NotificationContenxtProvider = (props) => {
  const [notificationText, notificationDispatch] = useReducer(notificationReducer, '')

  return (
    <NotificationContext.Provider value={[notificationText, notificationDispatch]}>
      {props.children}
    </NotificationContext.Provider>
  )
}

export default NotificationContext