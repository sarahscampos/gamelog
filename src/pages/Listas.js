import React, { useState, useEffect } from 'react';
import Carrossel from '../components/Carrossel';
import { FaArrowCircleRight } from "react-icons/fa";
import { Link } from "react-router-dom";

const Listas = ({ listas, dados }) => {


  function obtemJogos(index) {
    const lista = listas[0][index]["ids"]
      ? dados.filter((jogo) => listas[0][index]["ids"].includes(jogo.id))
      : [];
      return lista; 
  }


  return (
    <>
      <div className="flex justify-between items-center w-full mx-auto my-0 px-10 py-10 bg-zinc-600 text-white font-inter">
        <h1 className="text-2xl font-bold">Minhas listas</h1>
        <button className="flex gap-2 px-5 py-1 items-center justify-center text-md rounded-lg bg-indigo-600 hover:bg-indigo-400 font-fira font-bold">
          Nova lista
        </button>
      </div>

      <section className='ml-5 mr-5'>
        <div className="mt-16">
          {listas[0] && listas[0].length > 0 ? (
            listas[0].map((item, index) => {
              const jogosLista = obtemJogos(index)
              return (
              <div key={index} className="flex flex-col">
                <Link to={`/lista/${index}`} className="text-2xl font-bold font-inter flex items-center gap-5">
                  {item.nome}
                  <FaArrowCircleRight className='text-indigo-600'/>
                </Link>
                
                <Carrossel  jogos={jogosLista}/>
              </div>
            )
            })
          ) : (
            <p className="text-white">Nenhuma lista encontrada.</p>
          )}
        </div>
      </section>
    </>
  );
};

export default Listas;

