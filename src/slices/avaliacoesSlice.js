import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchAvaliacoes = createAsyncThunk('avaliacoes/fetchAvaliacoes', async () => {
  const response = await fetch('http://localhost:3000/avaliacoes');
  if (!response.ok) throw new Error('Erro ao carregar as avaliações');
  return response.json();
});

export const addAvaliacoes = createAsyncThunk('Avaliacoes/addAvaliacoes', async ({userId, avaliacaoId, avaliacaoNum, avaliacaoReview}) => {

  const response = await fetch('http://localhost:3000/avaliacoes');
  if (!response.ok) {
    throw new Error(`Erro ao obter Avaliacoess: ${response.statusText}`);
  }

  const data = await response.json();

  const avaliacao = {"usuario": userId, "nota": avaliacaoNum, "comentario": avaliacaoReview};

  const avaliacoesDoJogo = data[avaliacaoId] || [];
  const indexExistente = avaliacoesDoJogo.findIndex(avaliacao => avaliacao.usuario === userId);

  if (indexExistente !== -1) {
    // Atualizar avaliação existente
    avaliacoesDoJogo[indexExistente] = avaliacao;
  } else {
    // Adicionar nova avaliação
    avaliacoesDoJogo.push(avaliacao);
  }
 
  const patchResponse = await fetch('http://localhost:3000/avaliacoes', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data), 
  });

  if (!patchResponse.ok) {
    throw new Error(`Erro ao atualizar as Avaliacoes: ${patchResponse.statusText}`);
  }

  return data.Avaliacoess;
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
