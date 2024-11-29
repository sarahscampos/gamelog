import { createSlice } from '@reduxjs/toolkit';

// Estado inicial da funcionalidade do fórum
const initialState = {
  jogos: {}, // Lista de postagens
};

// Criação do slice
const forumSlice = createSlice({
  name: 'forum', // Nome único para identificar o slice
  initialState, // Estado inicial definido acima
  reducers: {
    // Ações e lógica associada
    addPost: (state, action) => {
        const{jogoId,post} = action.payload;
      if(!state.jogos[jogoId]){
        state.jogos[jogoId] = [];
      }
      state.jogos[jogoId].push(post);
    },
  },
});

// Exporta as ações (actions) geradas automaticamente
export const { addPost } = forumSlice.actions;

// Exporta o reducer para ser registrado na store
export default forumSlice.reducer;
