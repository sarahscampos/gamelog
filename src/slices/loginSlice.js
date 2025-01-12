import { createSlice } from '@reduxjs/toolkit';

const loginSlice = createSlice({
  name: 'auth',
  initialState: {
    user: JSON.parse(localStorage.getItem('user')) || { email: '', senha: '', role: '' },
  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      localStorage.setItem('user', JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.user = { email: '', senha: '', role: '' };
      localStorage.removeItem('user');  // Remover usuário do localStorage
    },
  },
});

export const { login, logout } = loginSlice.actions;
export default loginSlice.reducer;
