import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchAvaliacoes = createAsyncThunk('avaliacoes/fetchAvaliacoes', async () => {
  const response = await fetch('http://localhost:3000/avaliacoes');
  if (!response.ok) throw new Error('Erro ao carregar as avaliações');
  return response.json();
});

const avaliacoesSlice = createSlice({
  name: 'avaliacoes',
  initialState: {
    dados: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAvaliacoes.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAvaliacoes.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.dados = action.payload;
      })
      .addCase(fetchAvaliacoes.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default avaliacoesSlice.reducer;
