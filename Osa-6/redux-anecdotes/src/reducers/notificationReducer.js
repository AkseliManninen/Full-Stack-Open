import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: { notification: '', isVisible: false },
  reducers: {
    showNotification(state, action) {
      state.notification = action.payload
      state.isVisible = true
    },
    dontShowNotification(state) {
      state.isVisible = false
    },
  },
})

export const { showNotification, dontShowNotification } = notificationSlice.actions
export default notificationSlice.reducer