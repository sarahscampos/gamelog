import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchListas = createAsyncThunk('listas/fetchListas', async () => {
  const response = await fetch('http://localhost:3000/listas/0');
  if (!response.ok) throw new Error('Erro ao carregar as listas');
  return response.json();
});

export const addLista = createAsyncThunk('listas/addLista', async (novaLista) => {

  const response = await fetch('http://localhost:3000/listas/0');
  if (!response.ok) {
    throw new Error(`Erro ao obter listas: ${response.statusText}`);
  }

  const data = await response.json();


  //const listasAtualizadas = [...listas, novaLista];
  data.listas.push(novaLista);
 
  const patchResponse = await fetch('http://localhost:3000/listas/0', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data), 
  });

  if (!patchResponse.ok) {
    throw new Error(`Erro ao atualizar as listas: ${patchResponse.statusText}`);
  }

  return data.listas;
});

export const addJogoToList = createAsyncThunk('listas/addJogo', async ({ idJogo, idLista }) => {

  const response = await fetch('http://localhost:3000/listas/0');
  if (!response.ok) {
    throw new Error(`Erro ao obter listas: ${response.statusText}`);
  }

  const data = await response.json();

  //const listasAtualizadas = [...listas, novaLista];
  const index = data.listas.findIndex((lista) => lista.id === idLista);

  if (index === -1) {
    throw new Error(`lista com id: ${idLista} não existe`);
  }

  if(data.listas.ids.findIndex((jogo) => jogo.id === idJogo)){
    throw new Error(`Jogo com id ${idJogo} já está na lista: ${data.listas[idLista].nome}`);
  }
  data.listas[index].ids.push(idJogo);
 
  const patchResponse = await fetch('http://localhost:3000/listas/0', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data), 
  });

  if (!patchResponse.ok) {
    throw new Error(`Erro ao atualizar as listas: ${patchResponse.statusText}`);
  }

  return data.listas;
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
        state.dados = action.payload; // Atualiza apenas o array "0"
      });
  },
});

export default listasSlice.reducer;