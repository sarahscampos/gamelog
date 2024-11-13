import React, { createContext, useContext } from 'react';
import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";
const AvaliacoesContext = createContext();

const Avaliacao = () => {
    const avaliacoes = useContext(AvaliacoesContext);

    return (
        <>
        {avaliacoes.map((avaliacao, index) => (
        <div key={index} className="flex flex-col items-center space-x-4 py-8 px-8 bg-indigo-100 rounded-lg w-full mb-8 lg:flex-row">
          <img src={avaliacao.imgSrc} alt={`Foto do usuário ${avaliacao.usuario}`} className="w-16 h-16 ring-4 ring-indigo-600 rounded-full" />
          <div className="flex flex-col gap-2 p-4">
            <p className="text-gray-800 text-sm italic">{avaliacao.usuario}</p>
            <p className="text-0.8xl text-indigo-600 font-bold font-inter">Nota: {avaliacao.nota}</p>
            <p className="text-md">{avaliacao.comentario}</p>
            <div className="flex justify-end">
              <AiOutlineLike/>
              <AiOutlineDislike/>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default Avaliacao;