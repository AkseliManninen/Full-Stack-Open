import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { dontShowNotification } from '../reducers/notificationReducer'

const Notification = () => {
  const { notification, isVisible } = useSelector(state => state.notification)
  const dispatch = useDispatch()

  useEffect(() => {
    let timer
    if (isVisible) {
      timer = setTimeout(() => {
        dispatch(dontShowNotification())
      }, 5000)
    }
    return () => clearTimeout(timer)
  }, [isVisible, dispatch])

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    display: isVisible ? 'block' : 'none',
  }

  return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification