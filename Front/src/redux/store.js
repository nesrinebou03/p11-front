import { configureStore } from '@reduxjs/toolkit'
import authSlice from './slices/auth'
import userSlice from './slices/user'


export default configureStore({
  reducer: {
    auth: authSlice,// gérer l'authentification
    user: userSlice, // gérer les informations de user
  },
})