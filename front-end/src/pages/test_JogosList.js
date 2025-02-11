import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchJogos } from '../slices/jogosSlice';

const JogosList = () => {
  const dispatch = useDispatch();
  
  const jogos = useSelector((state) => state.jogos.dados);
  const status = useSelector((state) => state.jogos.status);
  const error = useSelector((state) => state.jogos.error);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchJogos());
    }
  }, [dispatch, status]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Lista de Jogos</h1>
      <ul>
        {jogos.map((jogo) => (
          <li key={jogo.id}>{jogo.nome}</li>
        ))}
      </ul>
    </div>
  );
};

export default JogosList;
