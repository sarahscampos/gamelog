import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from '../apiCliente';

export const fetchUsuario = createAsyncThunk('perfil/fetchUsuario', async (userId) => {
    const response = await apiClient.get(`/perfil/${userId}`);
    return response.data;  // Axios já retorna JSON automaticamente
});

/*
export const fetchUsuario = createAsyncThunk('perfil/fetchUsuario', async (userId) => {
    const response = await fetch(`http://localhost:5000/perfil/${userId}`);
    if (!response.ok) throw new Error('Erro ao carregar o usuario');
    return response.json();
});
*/
/*
export const fetchUsuario = createAsyncThunk('perfil/fetchUsuario', async (userId, { getState }) => {
    const token = getState().auth.token;
    const response = await fetch(`http://localhost:5000/perfil/${userId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    if (!response.ok) throw new Error('Erro ao carregar o usuário');
    return response.json();
});
*/
const usuarioSlice = createSlice({
    name: 'perfil',
    initialState: {
      dados: {},
      status: 'idle',
      error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchUsuario.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(fetchUsuario.fulfilled, (state, action) => {
          state.status = 'succeeded';
          state.dados = action.payload;
        })
        .addCase(fetchUsuario.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.error.message;
        });
    },
  });

  export default usuarioSlice.reducer;