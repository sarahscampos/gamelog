import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchAvaliacoes = createAsyncThunk('avaliacoes/fetchAvaliacoes', async () => {
  const response = await fetch('http://localhost:3000/avaliacoes');
  if (!response.ok) throw new Error('Erro ao carregar as avaliações');
  return response.json();
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

//delete Jogo
export const deleteAvaliacao = createAsyncThunk('Avaliacoes/deleteAvaliacao',
  async ({ jogoId, usuarioId }, { getState }) => {
    
    const state = getState();
    const data = state.avaliacoes.dados;

    if (!data[jogoId]) throw new Error("Jogo não possui avaliações.");

    const novasAvaliacoes = data[jogoId].filter(
      (avaliacao) => avaliacao.usuarioId !== usuarioId
    );

    // Atualiza o backend com a nova lista
    const response = await fetch(`http://localhost:3000/avaliacoes`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...data,
        [jogoId]: novasAvaliacoes,
      }),
    });

    if (!response.ok) {
      throw new Error("Erro ao deletar a avaliação");
    }

    // Incrementar o avaliacaoCount no perfil do usuário
    const perfilResponse = await fetch(`http://localhost:3000/perfil/${usuarioId}`);
    if (!perfilResponse.ok) {
      throw new Error(`Erro ao obter perfil do usuário: ${perfilResponse.statusText}`);
    }

    const perfilData = await perfilResponse.json();

    // Filtrar todas as avaliações do usuário
    const avaliacoesUsuario = Object.values(data)
      .flat() // Transforma todas as listas em uma única lista
      .filter(avaliacao => avaliacao.usuarioId === usuarioId);

    const totalNotas = avaliacoesUsuario.reduce((acc, curr) => acc + curr.nota, 0);
    const avaliacaoMedia = avaliacoesUsuario.length > 0 ? Math.round((totalNotas / avaliacoesUsuario.length)*10) / 10 : 0;

    const updatedPerfil = {
      ...perfilData,
      avaliacaoCount: avaliacoesUsuario.length,
      avaliacaoMedia,
    };

    const updatePerfilResponse = await fetch(`http://localhost:3000/perfil/${usuarioId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedPerfil),
    });

    if (!updatePerfilResponse.ok) {
      throw new Error(`Erro ao atualizar o perfil do usuário: ${updatePerfilResponse.statusText}`);
    }

    return { jogoId, novasAvaliacoes, avaliacoes: data.avaliacoes, perfil: updatedPerfil };
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
      });
  },
});

export default avaliacoesSlice.reducer;
