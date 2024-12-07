import { createSlice } from '@reduxjs/toolkit';

const loginSlice = createSlice({
  name: 'auth',
  initialState: {
    user: { email: '', senha: '' },
  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload; // Armazena o usuário logado
    },
    logout: (state) => {
      state.user = null; // Remove o usuário ao sair
    },
  },
});

export const { login, logout } = loginSlice.actions;
export default loginSlice.reducer;
