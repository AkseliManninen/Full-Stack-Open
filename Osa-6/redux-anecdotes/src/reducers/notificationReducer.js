import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: 'Notification',
  reducers: {
    showNotification(state, action) {
      return state
    }
  }
})

export const { showNotification } = notificationSlice.actions
export default notificationSlice.reducer