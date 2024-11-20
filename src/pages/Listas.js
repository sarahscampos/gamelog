import React, { useState, useEffect } from 'react';
import Carrossel from '../components/Carrossel';

const Listas = ({ listas }) => {
  const [dados, setDados] = useState([]);

  async function dadosJson() {
    try {
      const response = await fetch('http://localhost:3000/jogos');
      if (!response.ok) {
        throw new Error('Erro ao carregar o JSON');
      }
      const data = await response.json();
      setDados(data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    dadosJson();
  }, []);

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

      <section className="md:px-64 py-20">
        <div className="mt-16">
          {listas[0] && listas[0].length > 0 ? (
            listas[0].map((item, index) => {
              const jogosLista = obtemJogos(index)
              return (
              <div key={index} className="flex items-center flex-col gap-5 p-4 w-4/5">
                <a href="./lista.html" className="text-2xl font-bold font-inter">
                  {item.nome}
                </a>
                
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

