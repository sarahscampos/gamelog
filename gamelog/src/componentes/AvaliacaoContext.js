import React, { createContext, useState } from 'react';

// Criação do contexto
export const AvaliacoesContext = createContext();

export const AvaliacoesProvider = ({ children }) => {
  // Estado com as avaliações
  const [avaliacoes, setAvaliacoes] = useState(
    { usuario: 'João', nota: 4, comentario: 'Ótimo jogo!', imgSrc: 'https://via.placeholder.com/150' },
  );

  return (
    <AvaliacoesContext.Provider value={avaliacoes}>
      {children}
    </AvaliacoesContext.Provider>
  );
};