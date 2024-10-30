import { createSlice } from '@reduxjs/toolkit'

// gérer l'état des informations de user
export const userSlice = createSlice({
  name: 'user',
  initialState: {
    //les informations initial
    userName: '',
    firstName: '',
    lastName: '',
    email: '',
  },
  reducers: {
    /* Action pour définir ou mettre à jour 
    les informations complètes de user*/
    setUser: (state, action) => {
      state.userName = action.payload.userName;
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.email = action.payload.email;
    },
    /* Action pour mettre à jour seulement
     le username avec l nouvelle valeur*/
    updateUserName: (state, action) => {
      state.userName = action.payload;
    }
  },
})
// Export des actions pour les utiliser dans les composants
export const { setUser, updateUserName } = userSlice.actions;

// Export du reducer pour l'intégrer dans le store Redux
export default userSlice.reducer;