import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchUsuario = createAsyncThunk('avaliacoes/fetchUsuario', async (userId) => {
    const response = await fetch(`http://localhost:3000/perfil/${userId}`);
    if (!response.ok) throw new Error('Erro ao carregar o usuario');
    return response.json();
});

const usuarioSlice = createSlice({
    name: 'perfil',
    initialState: {
      dados: [],
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