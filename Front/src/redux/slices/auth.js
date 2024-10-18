import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: '',
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload
    },
    logout:(state) =>{
      state.token='';
      localStorage.removeItem('token');
    } 
  },
})

export const { setToken , logout } = authSlice.actions;

export default authSlice.reducer;