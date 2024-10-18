import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    userName: '',
    firstName: '',
    lastName: '',
    email: '',
  },
  reducers: {
    setUser: (state, action) => {
      state.userName = action.payload.userName;
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.email = action.payload.email;
    },
    updateUserName: (state, action) => {
      state.userName = action.payload;
    }
  },
})
// Action creators are generated for each case reducer function
export const { setUser, updateUserName } = userSlice.actions;


export default userSlice.reducer;