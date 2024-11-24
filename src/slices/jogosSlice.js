import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchJogos = createAsyncThunk('jogos/fetchJogos', async () => {
  const response = await fetch('http://localhost:3000/jogos');
  if (!response.ok) throw new Error('Erro ao carregar os jogos');
  return response.json();
});

const jogosSlice = createSlice({
  name: 'jogos',
  initialState: {
    dados: [],
    status: 'idle', // idle | loading | succeeded | failed
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchJogos.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchJogos.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.dados = action.payload;
      })
      .addCase(fetchJogos.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default jogosSlice.reducer;