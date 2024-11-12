import React, { useContext } from 'react';
import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";
import trevor from '../assets/img/icon-trevor.jpg';

const Avaliacao = () => {
  
  const dadosAvaliacao = {
    usuario: "Luigi",
    nota: 10,
    comentario: "Adorei o jogo!",
    imgSrc: trevor,
  }

  return (
    <>
    <section class = "mx-auto my-5 px-10 text-left md:px-64 py-20">
    <h2 class="text-2xl p-4 font-bold font-inter">Avaliações</h2>
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
    </section>
    </>
  );
};

export default Avaliacao;