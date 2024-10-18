import { configureStore } from '@reduxjs/toolkit'
import authSlice from './slices/auth'
import userSlice from './slices/user'

export default configureStore({
  reducer: {
    auth: authSlice,
    user: userSlice,
  },
})