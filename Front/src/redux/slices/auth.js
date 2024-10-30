import { createSlice } from '@reduxjs/toolkit'

//gérer l'état d'authentification
export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: '',
  },
  reducers: {
     // Action pour définir le token après la connexion réussie
    setToken: (state, action) => {
      state.token = action.payload; // Mise à jour du token avec la valeur reçue
    },
        // Action pour se déconnecter et supprimer le token
    logout:(state) =>{
      state.token='';// Réinitialiser le token
      localStorage.removeItem('token'); // Supprimer le token du stockage local
    } 
  },
})

// Export des actions pour les utiliser dans les composants
export const { setToken , logout } = authSlice.actions;

// Export du reducer pour l'intégrer dans le store Redux
export default authSlice.reducer;