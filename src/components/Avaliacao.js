import React from 'react';
import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";

const Avaliacao = ({dadosAvaliacao}) => {
  

  return (
    <>
          <div className="flex flex-col items-center space-x-4 py-8 px-8 bg-indigo-100 rounded-lg w-full mb-8 lg:flex-row">
            {/* mantem esse || so pra ter os comentarios mockados*/}
            <img src={dadosAvaliacao.usuario.avatar || dadosAvaliacao.imgSrc} alt="Foto do usuário" className="w-16 h-16 ring-4  ring-indigo-600 rounded-full" />
            <div className="flex flex-col gap-2 p-4">
              <p className="text-gray-800 text-sm italic">{dadosAvaliacao.usuario.nome || dadosAvaliacao.usuario}</p>
              <p className="text-0.8xl text-indigo-600 font-bold font-inter">Nota: {dadosAvaliacao.nota}</p>
              <p className="text-md">
                {dadosAvaliacao.comentario}
              </p>
              <div className="flex justify-end">
                <AiOutlineLike/>
                <AiOutlineDislike/>
              </div>
            </div>
          </div>
    </>
  );
};

export default Avaliacao;