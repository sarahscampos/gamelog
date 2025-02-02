import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchListas = createAsyncThunk('listas/fetchListas', async (userId) => {
  const response = await fetch(`http://localhost:3000/listas/${userId}`);
  if (!response.ok) throw new Error('Erro ao carregar as listas');
  return response.json();
});

export const addLista = createAsyncThunk('listas/addLista', async ({ userId, novaLista }) => {
  const response = await fetch(`http://localhost:3000/listas/${userId}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(novaLista),
  });
  if (!response.ok) throw new Error('Erro ao adicionar lista');
  return response.json();
});

export const addJogoToList = createAsyncThunk('listas/addJogo', async ({ idJogo, idLista, userId }) => {
  const response = await fetch(`http://localhost:3000/listas/${userId}/${idLista}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ idJogo }),
  });
  if (!response.ok) throw new Error('Erro ao adicionar jogo à lista');
  return response.json();
});

export const removeJogoFromList = createAsyncThunk('listas/removeJogo', async ({ idJogo, idLista, userId }) => {
  const response = await fetch(`http://localhost:3000/listas/${userId}/${idLista}/remove`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ idJogo }),
  });
  if (!response.ok) throw new Error('Erro ao remover jogo da lista');
  return response.json();
});

export const deleteLista = createAsyncThunk('listas/deleteLista', async ({ userId, idLista }) => {
  const response = await fetch(`http://localhost:3000/listas/${userId}/${idLista}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Erro ao excluir lista');
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
      })
      .addCase(addLista.fulfilled, (state, action) => {
        state.dados.push(action.payload);
      })
      .addCase(deleteLista.fulfilled, (state, action) => {
        state.dados = state.dados.filter(lista => lista._id !== action.payload._id);
      });
  },
});

export default listasSlice.reducer;
