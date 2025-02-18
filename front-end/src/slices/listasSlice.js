import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchListas = createAsyncThunk('listas/fetchListas', async (username) => {
  console.log(username);
  const response = await fetch(`http://localhost:3000/listas/${username}`);
  if (!response.ok) throw new Error('Erro ao carregar as listas');
  const data = await response.json();
  console.log(data);
  return data;
});

export const addLista = createAsyncThunk('listas/addLista', async ({ username, novaLista }) => {
  const response = await fetch(`http://localhost:3000/listas/${username}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(novaLista),
  });
  if (!response.ok) throw new Error('Erro ao adicionar lista');
  return response.json();
});

export const addJogoToList = createAsyncThunk('listas/addJogo', async ({ idJogo, idLista, username }) => {
  const response = await fetch(`http://localhost:3000/listas/${username}/${idLista}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ idJogo }),
  });
  if (!response.ok) throw new Error('Erro ao adicionar jogo à lista');
  return response.json();
});

export const removeJogoFromList = createAsyncThunk('lista/removeJogo', async ({ idJogo, idLista, username }) => {
  const response = await fetch(`http://localhost:3000/lista/${username}/${idLista}/remove`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ idJogo }),
  });
  if (!response.ok) throw new Error('Erro ao remover jogo da lista');
  return response.json();
});

export const deleteLista = createAsyncThunk('listas/deleteLista', async ({ username, idLista }) => {
  const response = await fetch(`http://localhost:3000/listas/${username}/${idLista}`, {
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
        state.dados = state.dados.filter(lista => lista._id !== action.meta.arg.idLista);
      })
      .addCase(addJogoToList.fulfilled, (state, action) => {
        const listaAtualizada = action.payload; // Retorna a lista inteira atualizada
        const listaIndex = state.dados.findIndex(lista => lista._id === listaAtualizada._id);
        if (listaIndex !== -1) {
            state.dados[listaIndex] = listaAtualizada; // Atualiza toda a lista
        }
    })
    .addCase(removeJogoFromList.fulfilled, (state, action) => {
        const listaAtualizada = action.payload;
        const listaIndex = state.dados.findIndex(lista => lista._id === listaAtualizada._id);
        if (listaIndex !== -1) {
            state.dados[listaIndex] = listaAtualizada; // Atualiza toda a lista
        }
    });
  },
});

export default listasSlice.reducer;
