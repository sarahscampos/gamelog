import React from 'react';
import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";

const Avaliacao = ({dadosAvaliacao}) => {
  
  /*const dadosAvaliacao = {
    usuario: "Luigi",
    nota: 10,
    comentario: "Adorei o jogo!",
    imgSrc: trevor,
  }*/

  return (
    <>
          <div class="flex flex-col items-center space-x-4 py-8 px-8 bg-indigo-100 rounded-lg w-full mb-8 lg:flex-row">
            <img src={dadosAvaliacao.imgSrc} alt="Foto do usuário" class="w-16 h-16 ring-4  ring-indigo-600 rounded-full" />
            <div class="flex flex-col gap-2 p-4">
              <p class="text-gray-800 text-sm italic">{dadosAvaliacao.usuario}</p>
              <p class="text-0.8xl text-indigo-600 font-bold font-inter">Nota: {dadosAvaliacao.nota}</p>
              <p class="text-md">
                {dadosAvaliacao.comentario}
              </p>
              <div class="flex justify-end">
              </div>
            </div>
          </div>
    </>
  );
};

export default Avaliacao;