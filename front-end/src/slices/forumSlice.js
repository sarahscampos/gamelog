import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchForumComents = createAsyncThunk('forumComent/fetchForumComents', async (jogoId) => {
  const response = await fetch(`http://localhost:3000/forum/${jogoId}`);
  if (!response.ok) throw new Error('Erro ao carregar o fórum');
  return response.json();
});


export const addForumComent = createAsyncThunk('forumComent/addForumComent', async ({jogoId, username, coment}) => {
  const response = await fetch(`http://localhost:3000/forum/${jogoId}`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json',
        body: JSON.stringify({
          coment: coment,
          username: username,
          createdAt: coment.createdAt // 🔹 Trocar pelo usuário real
        }),
      //credentials: 'include',
      }
  });
  if(!response.ok) throw new Error('Erro ao adicionar comentario');
  return response.json();
});


// Estado inicial da funcionalidade do fórum
const initialState = {
  jogos: {}, // Lista de postagens
  loading: false,
  error: null,
};

const forumSlice = createSlice({
  name: 'forum',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchForumComents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchForumComents.fulfilled, (state, action) => {
        state.loading = false;
        state.jogos[action.meta.arg] = action.payload; // Adiciona os comentários do jogo específico
      })
      .addCase(fetchForumComents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addForumComent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addForumComent.fulfilled, (state, action) => {
        state.loading = false;
        const { gameId, coment } = action.payload;
        if (!state.jogos[gameId]) {
          state.jogos[gameId] = [];
        }
        state.jogos[gameId].push(coment);
      })
      .addCase(addForumComent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});


// Exporta o reducer para ser registrado na store
export default forumSlice.reducer;
