import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchListas = createAsyncThunk('listas/fetchListas', async () => {
  const response = await fetch('http://localhost:3000/listas');
  if (!response.ok) throw new Error('Erro ao carregar as listas');
  return response.json();
});

const listasSlice = createSlice({
  name: 'listas',
  initialState: {
    dados: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchListas.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchListas.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.dados = action.payload;
      })
      .addCase(fetchListas.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default listasSlice.reducer;
