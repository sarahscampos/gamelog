import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Modal from 'react-modal';
import { RiArrowGoBackFill } from "react-icons/ri";

import Avaliacao from "../components/Avaliacao";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import backgroundJogo from "../assets/img/backgroundJogo.png";
import trevor from '../assets/img/icon-trevor.jpg';



const dadosAvaliacao = {
    usuario: "Luigi",
    nota: 10,
    comentario: "Adorei o jogo!",
    imgSrc: trevor,
}

const listas = ["Favoritos", "Desejados", "Jogados"];

const Jogo = () => {
  const { id } = useParams();
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
    toast.success(`${dados[id].nome} foi adicionado à lista ${list}!`)
    closeModal();
  }

  if (dados.length === 0) {
    return <p>Carregando...</p>;
  }

  return (
    <>

    <section style={{backgroundImage: `url(${backgroundJogo})`}} className="w-full mx-auto my-0 px-10 md:px-64 py-20 bg-fixed">

    <div class="flex justify-between">
      <button onClick={() => navigate(-1)} /*bug de não ter pagina anterior?*/class="items-center gap-1 inline-flex px-4 py-2 rounded-lg border-2 border-cyan-600 text-white hover:bg-cyan-600 font-inter">
      <RiArrowGoBackFill />
        Voltar
      </button>
      <Link to='/' class="items-center gap-1 inline-flex px-4 py-2 rounded-lg border-2 border-cyan-600 text-white hover:bg-cyan-600 font-inter">Ranking {dados[id].colocacao}</Link>
    </div>

    <div class="flex flex-col items-center m-10">
        <img src={`/${dados[id].capa}`} alt={dados[id].nome} className="w-29 ring-4 ring-indigo-700 rounded-md mb-6"/>
        <h2 class ="text-xl sm:text-2xl lg:text-3xl font-inter font-bold text-white mb-3">{dados[id].nome}</h2>
        <p class="text-white rounded bg-gradient-to-tl from-indigo-500 to-cyan-600 px-5 py-2">Nota média: {dados[id].nota}</p>

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
        {dados[id].generos.map((genero) => {
          return <p key={dados[id].id} class = "text-lg font-medium text-white px-3 py-1 rounded bg-zinc-500">{genero}</p>
        })}
      </div>

      {/* <hr class="border-2"> */}
      <div class = "flex justify-between text-sm sm:text-lg font-medium">
      <h2 class = "text-sm sm:text-lg">Data de lançamento</h2>
      <h2 class = "text-sm sm:text-lg">{dados[id].dataLancamento}</h2>
      </div>
      <div class = "flex justify-between text-sm sm:text-lg font-medium">
        <h2 class = "text-sm sm:text-lg">Desenvolvedora</h2>
        <h2 class = "text-sm sm:text-lg">{dados[id].desenvolvedora}</h2>
      </div>
      <div class = "flex justify-between text-sm sm:text-lg font-medium">
        <h2 class = "text-sm sm:text-lg">Distribuidora</h2>
        <h2 class = "text-sm sm:text-lg">{dados[id].distribuidora}</h2>
      </div>

      {/* <hr class="border-2"> */}
    </div>
  </section>

  <section class="bg-zinc-300 mx-auto my-5 px-10 text-left md:px-64 py-20">
    <h2 class="text-2xl p-4 font-bold font-inter">Sumário</h2>
      <div class="flex space-x-4 p-4 w-full">
        <p className="font-fira">
          {dados[id].sumario}
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
        
        <a href="forum.html" class="text-white text-2xl px-4 py-2 font-inter font-bold underline decoration-solid"> Acesse o fórum de {dados[id].nome}</a>
        <p class="text-gray-300 text-md"> Converse • Tire dúvidas • Compartilhe curiosidades</p>

      </div>

    </div>
  </section>

    </>
  );
}

export default Jogo;