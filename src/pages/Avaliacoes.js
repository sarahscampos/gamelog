import React from 'react'

import Avaliacao from "../components/Avaliacao";

import trevor from '../assets/img/icon-trevor.jpg';

const Avaliacoes = () => {
    const avaliacoes = [
        {
          usuario: "Luigi",
          nota: 10,
          comentario: "Adorei o jogo!",
          imgSrc: trevor,
        },
        {
          usuario: "Maria",
          nota: 8,
          comentario: "Ótimo jogo, mas poderia ter mais desafios.",
          imgSrc: trevor,
        },
        {
          usuario: "João",
          nota: 7,
          comentario: "É divertido, mas encontrei alguns bugs.",
          imgSrc: trevor,
        },
      ]

      const dadosAvaliacao1 = {
        usuario: "Luigi",
        nota: 10,
        comentario: "Adorei o jogo!",
        imgSrc: trevor,
    }

      return (
        <>
        <div className="mx-auto my-5 px-10 text-left md:px-64 py-20">
          <h2 className="text-2xl p-4 font-bold font-inter">Avaliações</h2>
          <section class = "mx-auto my-5 px-10 text-left md:px-64 py-20">
          {avaliacoes.map((dados, index) => (
            <Avaliacao key={index} dadosAvaliacao={dados} />
          ))}
          </section>
        </div>
        </>
      );
};

export default Avaliacoes;