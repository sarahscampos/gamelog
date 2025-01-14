import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchListas = createAsyncThunk('listas/fetchListas', async (userId) => {
  const response = await fetch(`http://localhost:3000/listas/${userId}`);
  if (!response.ok) throw new Error('Erro ao carregar as listas');
  return response.json();
});

export const addLista = createAsyncThunk('listas/addLista', async ({ userId, novaLista }) => {
  console.log(userId)
  const response = await fetch(`http://localhost:3000/listas/${userId}`);
  if (!response.ok) {
    throw new Error(`Erro ao obter listas: ${response.statusText}`);
  }

  const data = await response.json();

  // Verifica se a nova lista não está já na coleção
  if (data.listas.some(lista => lista.id === novaLista.id)) {
    throw new Error(`Lista com id ${novaLista.id} já existe`);
  }

  // Adiciona a nova lista
  data.listas.push(novaLista);

  const patchResponse = await fetch(`http://localhost:3000/listas/${userId}`, {
    method: 'PUT', // ou 'PATCH', dependendo de como o backend trata os dados
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

export const addJogoToList = createAsyncThunk('listas/addJogo', async ({ idJogo, idLista, userId }) => {

  const response = await fetch(`http://localhost:3000/listas/${userId}`);
  if (!response.ok) {
    throw new Error(`Erro ao obter listas: ${response.statusText}`);
  }

  const data = await response.json();

  //const listasAtualizadas = [...listas, novaLista];
  const index = data.listas.findIndex((lista) => lista.id === idLista);

  if (index === -1) {
    throw new Error(`lista com id: ${idLista} não existe`);
  }

  if(data.listas[index].ids.findIndex((jogo) => jogo.id === idJogo) !== -1){
    throw new Error(`Jogo com id ${idJogo} já está na lista: ${data.listas[index].nome}`);
  }
  data.listas[index].ids.push(idJogo);
 
  const patchResponse = await fetch(`http://localhost:3000/listas/${userId}`, {
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

export const removeJogoFromList = createAsyncThunk('listas/removeJogo', async ({ idJogo, idLista, userId }) => {
  const response = await fetch(`http://localhost:3000/listas/${userId}`);
  if (!response.ok) {
    throw new Error(`Erro ao obter listas: ${response.statusText}`);
  }

  const data = await response.json();

  // Encontra a lista pelo ID
  const index = data.listas.findIndex((lista) => lista.id === idLista);
  if (index === -1) {
    throw new Error(`Lista com id: ${idLista} não existe`);
  }

  // Verifica se o jogo existe na lista
  const jogoIndex = data.listas[index].ids.indexOf(idJogo);
  if (jogoIndex === -1) {
    throw new Error(`Jogo com id ${idJogo} não está na lista: ${data.listas[index].nome}`);
  }

  // Remove o jogo da lista
  data.listas[index].ids.splice(jogoIndex, 1);

  // Atualiza os dados no backend
  const patchResponse = await fetch(`http://localhost:3000/listas/${userId}`, {
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

export const deleteLista = createAsyncThunk('listas/deleteLista', async ({ userId, idLista }) => {
  const response = await fetch(`http://localhost:3000/listas/${userId}`);
  if (!response.ok) {
    throw new Error(`Erro ao obter listas: ${response.statusText}`);
  }

  const data = await response.json();

  // Encontra a lista pelo ID
  const index = data.listas.findIndex((lista) => lista.id === idLista);
  if (index === -1) {
    throw new Error(`Lista com id: ${idLista} não encontrada`);
  }

  // Remove a lista do array
  data.listas.splice(index, 1);

  // Atualiza os dados no backend
  const patchResponse = await fetch(`http://localhost:3000/listas/${userId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!patchResponse.ok) {
    throw new Error(`Erro ao atualizar as listas: ${patchResponse.statusText}`);
  }

  return data.listas;  // Retorna a lista atualizada sem a lista deletada
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
      })
      .addCase(deleteLista.fulfilled, (state, action) => {
        state.dados = action.payload;  // Atualiza a lista com o item deletado
      });
  },
});

export default listasSlice.reducer;