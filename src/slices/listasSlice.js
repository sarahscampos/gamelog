import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from "react-redux";

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

  // const listas = await response.json();
  const listas = useSelector((state) => state.listas.dados);



  const listasAtualizadas = [...listas, novaLista];

 
  const patchResponse = await fetch('http://localhost:3000/listas/0', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(listasAtualizadas), 
  });

  if (!patchResponse.ok) {
    throw new Error(`Erro ao atualizar as listas: ${patchResponse.statusText}`);
  }

  return listasAtualizadas;
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
