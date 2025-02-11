import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchPerfil = createAsyncThunk('avaliacoes/fetchPerfil', async (userId) => {
  const response = await fetch(`http://localhost:3000/perfil/${userId}`);
  if (!response.ok) throw new Error('Erro ao carregar o perfil');
  return response.json();
});

const perfilSlice = createSlice({
    name: 'perfil',
    initialState: {
      dados: [],
      status: 'idle',
      error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchPerfil.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(fetchPerfil.fulfilled, (state, action) => {
          state.status = 'succeeded';
          state.dados = action.payload;
        })
        .addCase(fetchPerfil.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.error.message;
        });
    },
  });

  export default perfilSlice.reducer;