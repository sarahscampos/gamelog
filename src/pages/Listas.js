import React, { useState, useEffect } from 'react';
import Carrossel from '../components/Carrossel';
import { FaArrowCircleRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import Modal from 'react-modal';
const Listas = ({ listas, dados }) => {


  function obtemJogos(index, novaLista) {
    const lista = novaLista[index]["ids"]
      ? dados.filter((jogo) => novaLista[index]["ids"].includes(jogo.id))
      : [];
    return lista;
  }

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedList, setSelectedList] = useState("");

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false)
  }

  const [nomeLista, setNomeLista] = useState("");

  const enviaNomeLista = async () => {
    try {
      // Buscando as listas do usuário 0
      const responseGet = await fetch('http://localhost:3000/listas/0');
      if (!responseGet.ok) throw new Error('Erro ao buscar listas do usuário');

      const data = await responseGet.json();

      // Adicionando a nova lista
      const novaLista = { id: data.listas.length, nome: nomeLista, ids: [] };
      data.listas.push(novaLista);

      // Atualizando as listas do usuário 0
      const responsePatch = await fetch('http://localhost:3000/listas/0', {
          method: 'PUT', // Ou PATCH
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
      });

      if (!responsePatch.ok) throw new Error('Erro ao atualizar listas');

      console.log('Lista adicionada com sucesso:', await responsePatch.json());
      closeModal();
  } catch (error) {
      console.error(error.message);
  }
  }

  const pegaListas = async () => {  
    const responseGet = await fetch('http://localhost:3000/listas/0');
    if (!responseGet.ok) throw new Error('Erro ao buscar listas do usuário');
    const data = await responseGet.json()
    return data.listas;
  }

  const novaLista = pegaListas();

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Minhas Listas</title>
        <link rel="canonical" href="http://mysite.com/example" />
        <meta name="description" content="Página de jogo" />
      </Helmet>
      <div className="flex justify-between items-center w-full mx-auto my-0 px-10 py-10 bg-zinc-600 text-white font-inter">
        <h1 className="text-2xl font-bold">Minhas listas</h1>
        <button className="flex gap-2 px-5 py-1 items-center justify-center text-md rounded-lg bg-indigo-600 hover:bg-indigo-400 font-fira font-bold" onClick={openModal}>
          Nova lista
        </button>
      </div>

      {/* modal para adicionar o jogo em listas, informações a partir da lista de listas do usuario*/}
      <Modal
        ariaHideApp={false}
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="NomeLista"
        className="bg-white p-6 rounded-lg w-96"
        overlayClassName="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50"
      >
        <h2 className="text-xl font-semibold mb-4">Criar Lista</h2>

        <label htmlFor="codigoCupom" className="block text-gray-800 font-semibold mb-2">
        </label>
        <input
          type="text"
          id="codigoCupom"
          placeholder="Nome da lista"
          className="w-full border border-gray-300 rounded-md p-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-4"
          value={nomeLista}
          onChange={(e) => setNomeLista(e.target.value)}
        />
        <button
          className="w-full bg-indigo-600 text-white font-semibold p-3 rounded-md hover:bg-indigo-700 transition duration-300"
          onClick={enviaNomeLista}
        >
          Criar lista
        </button>

        <button
          onClick={closeModal}
          className="mt-4 px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-400"
        >
          Fechar
        </button>
      </Modal>
      <section className='ml-5 mr-5'>
        <div className="mt-16">
          {novaLista && novaLista.length > 0 ? (
            novaLista.map((item, index) => {
              const jogosLista = obtemJogos(index, novaLista)
              return (
                <div key={index} className="flex flex-col">
                  <Link to={`/lista/${index}`} className="text-2xl font-bold font-inter flex items-center gap-5">
                    {item.nome}
                    <FaArrowCircleRight className='text-indigo-600' />
                  </Link>

                  <Carrossel jogos={jogosLista} />
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

