import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Modal from 'react-modal';

import Avaliacao from "../components/Avaliacao";
import capa from "../assets/img/marioKart.jpg";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import backgroundJogo from "../assets/img/backgroundJogo.png";
import trevor from '../assets/img/icon-trevor.jpg';

const dadosJogo = {
  nome: "Mario Kart",
  colocacao: 5,
  nota: 10,
  capa: capa,
  dataLancamento: "17/09/2013",
  desenvolvedora: "Rockstar North",
  distribuidora: "Rockstar Games",
  generos: ["ação", "aventura", "tiro"],
  sumario: "Mario Kart 8 (マリオカート8 Mario Kāto Aito?) é um jogo de corrida de karts desenvolvido e publicado pela Nintendo para o Wii U. É o décimo primeiro título da franquia Mario Kart, o oitavo da série principal (como o título sugere) e foi lançado em 30 de Maio de 2014. O jogo tem como principal novidade os circuitos antigravitacionais e pistas antigas dos jogos anteriores. Assim como os jogos anteriores, possui modos um jogador e multijogador local e online.",
}

const dadosAvaliacao = {
    usuario: "Luigi",
    nota: 10,
    comentario: "Adorei o jogo!",
    imgSrc: trevor,
}

const listas = ["Favoritos", "Desejados", "Jogados"];

const Jogo = () => {

  

  
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedList, setSelectedList] = useState("");

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false)
  }

  const addToList = (list) => {
    setSelectedList(list);
    toast.success(`${dadosJogo.nome} foi adicionado à lista ${list}!`)
    closeModal();
  }

  return (
    <>

    <section style={{backgroundImage: `url(${backgroundJogo})`}} className="w-full mx-auto my-0 px-10 md:px-64 py-20">

    <div class="flex justify-between">
      <button onClick={() => navigate(-1)} /*bug de não ter pagina anterior?*/class="items-center gap-1 inline-flex px-4 py-2 rounded-lg border-2 border-cyan-600 text-white hover:bg-cyan-600 font-inter">
        Voltar
      </button>
      <Link to='/' class="items-center gap-1 inline-flex px-4 py-2 rounded-lg border-2 border-cyan-600 text-white hover:bg-cyan-600 font-inter">Ranking {dadosJogo.colocacao}</Link>
    </div>

    <div class="flex flex-col items-center m-10">
        <img src={dadosJogo.capa} alt="capaJogo" className="w-29 ring-4 ring-indigo-700 rounded-md"/>
        <h2 class ="text-xl sm:text-2xl lg:text-3xl font-inter font-bold text-white mb-3">{dadosJogo.nome}</h2>
        <p class="text-white rounded bg-gradient-to-tl from-indigo-500 to-cyan-600 px-5 py-2">Nota média: {dadosJogo.nota}</p>

      </div>
      <div class="flex justify-center mt-16">
        <button class="text-lg flex items-center gap-2 px-8 py-2 rounded-md bg-indigo-500 text-white hover:bg-indigo-400 font-inter" onClick={openModal}>
          Adicionar à lista
        </button>
        <ToastContainer />
      </div>
  </section>


 {/* modal para adicionar o jogo em listas, informações a partir da lista de listas do usuario*/}
  <Modal 
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Escolha a Lista"
        className="bg-white p-6 rounded-lg w-96"
        overlayClassName="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50"
      >
        <h2 className="text-xl font-semibold mb-4">Escolha uma lista</h2>
        <ul className="space-y-4">
          {listas.map((lista, index) => (<li>
            <button
              onClick={() => addToList(lista)}
              className="w-full px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-400"
            >
              {lista}
            </button>
          </li>))}
        </ul>
        <button
          onClick={closeModal}
          className="mt-4 px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-400"
        >
          Fechar
        </button>
      </Modal>
  
  <section class="mx-auto my-0 px-10 md:px-64 py-20">

    <div className="flex flex-col gap-3 mt-7 font-fira">
      <div class = "flex space-x-4 mb-7">
        <p class = "text-lg font-medium text-white px-3 py-1 rounded bg-zinc-500">Ação</p>
        <p class = "text-lg font-medium text-white bg-zinc-500 px-3 py-1 rounded">Aventura</p>
        <p class = "text-lg font-medium text-white bg-zinc-500 px-3 py-1 rounded">Tiro</p>
      </div>

      {/* <hr class="border-2"> */}
      <div class = "flex justify-between text-sm sm:text-lg font-medium">
      <h2 class = "text-sm sm:text-lg">Data de lançamento</h2>
      <h2 class = "text-sm sm:text-lg">{dadosJogo.dataLancamento}</h2>
      </div>
      <div class = "flex justify-between text-sm sm:text-lg font-medium">
        <h2 class = "text-sm sm:text-lg">Desenvolvedora</h2>
        <h2 class = "text-sm sm:text-lg">{dadosJogo.desenvolvedora}</h2>
      </div>
      <div class = "flex justify-between text-sm sm:text-lg font-medium">
        <h2 class = "text-sm sm:text-lg">Distribuidora</h2>
        <h2 class = "text-sm sm:text-lg">{dadosJogo.distribuidora}</h2>
      </div>

      {/* <hr class="border-2"> */}
    </div>
  </section>

  <section class="bg-zinc-300 mx-auto my-5 px-10 text-left md:px-64 py-20">
    <h2 class="text-2xl p-4 font-bold font-inter">Sumário</h2>
      <div class="flex space-x-4 p-4 w-full">
        <p className="font-fira">
          {dadosJogo.sumario}
        </p>
      </div>
    
  </section>
    
  <section>
    <section class = "mx-auto my-5 px-10 text-left md:px-64 py-20">
      <h2 class="text-2xl p-4 font-bold font-inter">Avaliações</h2>
    </section>
    <section class = "mx-auto my-5 px-10 text-left md:px-64 py-20">
      <Avaliacao dadosAvaliacao={dadosAvaliacao}/>
    </section>
    <div style ={{ textAlign: 'right', paddingRight: '250px'}}>
            <Link to={"/avaliacoes"} class="px-4 py-2 rounded-lg bg-indigo-500 text-white hover:bg-indigo-400 font-inter" >Ver mais avaliacoes</Link>
          </div>
  </section>

  <section>
        <div class="mx-auto my-0 px-10 text-center md:px-64 py-20"> 
      <div class="flex items-center gap-2 flex-col py-4 px-8 bg-gradient-to-tl from-indigo-500 to-cyan-600 rounded-lg w-full mb-8">
        
        <a href="forum.html" class="text-white text-2xl px-4 py-2 font-inter font-bold underline decoration-solid"> Acesse o fórum do Grand Theft Auto V</a>
        <p class="text-gray-300 text-md"> Converse • Tire dúvidas • Compartilhe curiosidades</p>

      </div>

    </div>
  </section>

    </>
  );
}

export default Jogo;