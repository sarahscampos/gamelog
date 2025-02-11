import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchPerfil = createAsyncThunk('perfil/fetchPerfil', async (userId) => {
  const response = await fetch(`http://localhost:3000/perfil/${userId}`);
  if (!response.ok) throw new Error('Erro ao carregar o perfil');
  return response.json();
});

export const atualizaPerfil = createAsyncThunk(
  'perfil/atualizaPerfil',
  async ({ updatedUserData, usernameLogado }) => {
    const response = await fetch(`http://localhost:3000/perfil/${usernameLogado}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedUserData),
    });

    if (!response.ok) throw new Error(`Erro ao atualizar perfil: ${response.statusText}`);
    return response.json(); // retorna perfil atualizado
  }
);

const perfilSlice = createSlice({
  name: 'perfil',
  initialState: {
    dados: null,   // nenhum perfil carregado ainda
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
      })
      .addCase(atualizaPerfil.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(atualizaPerfil.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.dados = action.payload;
      })
      .addCase(atualizaPerfil.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default perfilSlice.reducer;
