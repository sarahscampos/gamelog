import { configureStore } from '@reduxjs/toolkit';
import jogosReducer from './slices/jogosSlice';
import avaliacoesReducer from './slices/avaliacoesSlice';
import listasReducer from './slices/listasSlice';

const store = configureStore({
  reducer: {
    jogos: jogosReducer,
    avaliacoes: avaliacoesReducer,
    listas: listasReducer,
  },
});

export default store;