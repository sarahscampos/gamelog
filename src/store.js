import { configureStore } from '@reduxjs/toolkit';
import jogosReducer from './slices/jogosSlice';
import avaliacoesReducer from './slices/avaliacoesSlice';
import listasReducer from './slices/listasSlice';
import forumReducer from './slices/forumSlice';
import cadastroReducer from './slices/cadastroSlice';

const store = configureStore({
  reducer: {
    jogos: jogosReducer,
    avaliacoes: avaliacoesReducer,
    listas: listasReducer,
    forum: forumReducer,
    cadastro: cadastroReducer
  },
});

export default store;