import { configureStore } from '@reduxjs/toolkit';
import jogosReducer from './slices/jogosSlice';
import avaliacoesReducer from './slices/avaliacoesSlice';
import listasReducer from './slices/listasSlice';
import forumReducer from './slices/forumSlice';
import cadastroReducer from './slices/cadastroSlice';
import perfilReducer from './slices/perfilSlice';
import loginReducer from './slices/loginSlice';
const store = configureStore({
  reducer: {
    jogos: jogosReducer,
    avaliacoes: avaliacoesReducer,
    listas: listasReducer,
    forum: forumReducer,
    cadastro: cadastroReducer,
    perfil: perfilReducer,
    auth: loginReducer,
  },
});

export default store;