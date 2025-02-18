import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchAvaliacoes = createAsyncThunk('avaliacoes/fetchAvaliacoes', async (idJogo) => {
  const response = await fetch(`http://localhost:3000/avaliacoes/${idJogo}`);
  if (!response.ok) throw new Error('Erro ao carregar as avaliações');
  const data = await response.json();
  console.log(data);
  return data;
});

export const addAvaliacoes = createAsyncThunk('Avaliacoes/addAvaliacoes', async ({ username, score, comment,  idJogo, token}) => {
    

  const avaliacao = { username, comment, score, idJogo};
   
 
  const patchResponse = await fetch('http://localhost:3000/protected/avaliacoes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(avaliacao), 
  });

    if (!patchResponse.ok) {
      throw new Error(`Erro ao atualizar as Avaliacoes: ${patchResponse.statusText}`);
    }

    return  await patchResponse.json();
  }
);

//delete Avaliação
export const deleteAvaliacao = createAsyncThunk('Avaliacoes/deleteAvaliacao',
  async ({ jogoId, usuarioId, avaliacaoId, token }, { getState }) => {

    
    const state = getState();
    const data = state.avaliacoes.dados;

    // Atualiza o backend com a nova lista
    const response = await fetch(`http://localhost:3000/protected/avaliacoes/${jogoId}/${usuarioId}/${avaliacaoId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      },
    });

    if (!response.ok) {
      throw new Error("Erro ao deletar a avaliação");
    }
    return { jogoId, avaliacoes: data.avaliacoes};
  }
);


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
      })
      .addCase(addAvaliacoes.fulfilled, (state, action) => {
        state.dados.push(action.payload);
      })
      .addCase(deleteAvaliacao.fulfilled, (state, action) => {
        state.dados = state.dados.filter(avaliacao => avaliacao._id !== action.meta.arg.avaliacaoId);
      })
  },
});

export default avaliacoesSlice.reducer;
