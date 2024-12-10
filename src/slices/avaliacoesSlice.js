import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchAvaliacoes = createAsyncThunk('avaliacoes/fetchAvaliacoes', async () => {
  const response = await fetch('http://localhost:3000/avaliacoes');
  if (!response.ok) throw new Error('Erro ao carregar as avaliações');
  return response.json();
});

export const addAvaliacoes = createAsyncThunk('Avaliacoes/addAvaliacoes', async ({ userId, avaliacaoId, avaliacaoNum, avaliacaoReview }) => {
    // Obter as avaliações existentes
    const response = await fetch('http://localhost:3000/avaliacoes');
    if (!response.ok) {
      throw new Error(`Erro ao obter Avaliacoes: ${response.statusText}`);
    }

    const data = await response.json();

    const avaliacao = { usuarioId: userId, nota: avaliacaoNum, comentario: avaliacaoReview };

    const avaliacoesDoJogo = data[avaliacaoId] || [];
    const indexExistente = avaliacoesDoJogo.findIndex(avaliacao => avaliacao.usuarioId === userId);

    if (indexExistente !== -1) {
      // Atualizar avaliação existente
      avaliacoesDoJogo[indexExistente] = avaliacao;
    } else {
      // Adicionar nova avaliação
      avaliacoesDoJogo.push(avaliacao);
    }

    // Atualizar o recurso de avaliações
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

    // Incrementar o avaliacaoCount no perfil do usuário
    const perfilResponse = await fetch(`http://localhost:3000/perfil/${userId}`);
    if (!perfilResponse.ok) {
      throw new Error(`Erro ao obter perfil do usuário: ${perfilResponse.statusText}`);
    }

    const perfilData = await perfilResponse.json();

    // Filtrar todas as avaliações do usuário
    const avaliacoesUsuario = Object.values(data)
      .flat() // Transforma todas as listas em uma única lista
      .filter(avaliacao => avaliacao.usuarioId === userId);

    const totalNotas = avaliacoesUsuario.reduce((acc, curr) => acc + curr.nota, 0);
    const avaliacaoMedia = avaliacoesUsuario.length > 0 ? Math.round((totalNotas / avaliacoesUsuario.length)*10) / 10 : 0;

    const updatedPerfil = {
      ...perfilData,
      avaliacaoCount: avaliacoesUsuario.length,
      avaliacaoMedia,
    };

    const updatePerfilResponse = await fetch(`http://localhost:3000/perfil/${userId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedPerfil),
    });

    if (!updatePerfilResponse.ok) {
      throw new Error(`Erro ao atualizar o perfil do usuário: ${updatePerfilResponse.statusText}`);
    }

    return { avaliacoes: data.Avaliacoes, perfil: updatedPerfil };
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
