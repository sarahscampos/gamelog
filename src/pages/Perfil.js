import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Carrossel from '../components/Carrossel';
import background from "../assets/img/backgroundJogo.png";
import Modal from "react-modal"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from "react-redux";
import { createAsyncThunk } from '@reduxjs/toolkit';
import { MdPlaylistAdd } from "react-icons/md";

// quero poder escolher quais listas vou mostrar no perfil
// quero atualizar o perfil "teste" -> id 0 quando adicionar um jogo na lista, favoritos, etc.
// quero poder editar o perfil ao vivo ( mudar o db de alguma forma igual o joao! )

const Perfil = ({listas, dados}) => {
  const { id } = useParams(); // Captura o ID do usuário na URL
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedList, setSelectedList] = useState("");

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false)
  }

  function obtemJogos(index){
    const lista = listas && listas[index]["ids"]
    ? dados.filter((jogo) => listas[index]["ids"].includes(jogo.id)) : [];
    return lista;
  }
  const favIndex = listas.findIndex((lista) => lista.nome === "Favoritos");
  const jogosFav = obtemJogos(favIndex);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        //const response = await fetch(`http://localhost:3000/perfil/${id}`);
        const response = await fetch(`http://localhost:3000/perfil/0`);
        if (!response.ok) {
          throw new Error("Erro ao carregar o perfil do usuário");
        }
        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);
  
  // id do perfil tbm
  const addListaPerfil = createAsyncThunk('perfil/fixaLista', async ({ idLista }) => {  

    const index = user.listasFixadas.findIndex((lista) => lista.id === idLista);
    
    // user.listasFixadas
    if(user.listasFixadas.findIndex((listaFixada) => listaFixada === idLista)){
      // ja ta na lista
      throw new Error(`Lista ${listas[idLista].nome} já está fixada no Perfil!`);
    }
    user.listasFixadas[idLista].push(idLista);
   
    const patchResponse = await fetch('http://localhost:3000/perfil/0/listasFixadas', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(idLista), 
    })
    if (!patchResponse.ok) {
      throw new Error(`Erro ao atualizar as listas: ${patchResponse.statusText}`);
    }
  
    return user.listaFixada;
  });

  const fixaLista = (lista) =>{
    setSelectedList(lista);
    dispatch(addListaPerfil(lista.id))
    .then(() => {
      toast.success(`${lista.nome} foi fixada no perfil!`);
      closeModal();
    })
    .catch((error) => {
      console.error("Erro ao adicionar o jogo à lista:", error);
    });
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-blue-500"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="text-center mt-20 text-lg font-inter text-red-600">
        Não foi possível carregar o perfil.
      </div>
    );
  }
  {/* modal para fixar a lista no perfil do usuario*/}
      <Modal
      ariaHideApp={false} 
      isOpen={isModalOpen}
      onRequestClose={closeModal}
      contentLabel="Escolha a Lista"
      className="bg-white p-6 rounded-lg w-96"
      overlayClassName="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50"
      >
      <h2 className="text-xl font-semibold mb-4">Escolha uma lista</h2>
      <ul className="space-y-4">
        {listas.map((lista, index) => (<li key={index}>
          <button
            onClick={() => addListaPerfil(lista)}
            className="w-full px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-400"
          >
            {lista.nome}
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
  return (
    
    <div style={{backgroundImage: `url(${background})`}} className="p-10">
      <div className="max-w-md mx-auto bg-white shadow-xl rounded-lg overflow-hidden">
        {/* Cabeçalho */}
        <div className="flex justify-between items-center p-4 bg-blue-500 text-white">
          <Link to="/" className="text-xl font-bold hover:underline">
            &larr; Voltar
          </Link>
          <span className="text-sm font-semibold">{user.nome}</span>
        </div>

        {/* Corpo do Perfil */}
        <div className="text-center p-4">
          <img
            src={user.avatar}
            alt={user.nome}
            className="w-24 h-24 rounded-full mx-auto shadow-lg"
          />
          <h2 className="mt-2 text-2xl font-semibold">{user.nome}</h2>
          <p className="text-gray-500">{user.descricao}</p>
          <p className="text-xs text-gray-400 mt-1">
            {user.localizacao} • Membro desde {user.membroDesde}
          </p>
        </div>

        {/* Estatísticas */}
        <div className="text-center p-4">
          <h3 className="text-lg font-semibold">Estatísticas</h3>
          <div className="grid grid-cols-3 text-center">
            <div>
              <span className="text-lg font-bold">{user.analises}</span>
              <p className="text-gray-500 text-sm">Análises</p>
            </div>
            <div>
              <span className="text-lg font-bold">{user.media}</span>
              <p className="text-gray-500 text-sm">Média</p>
            </div>
            <div>
              <span className="text-lg font-bold">{user.amigos}</span>
              <p className="text-gray-500 text-sm">Amigos</p>
            </div>
          </div>
        </div>
        </div>
          
        
        {/* AREA PRA LISTAS */}
        {/* JOGOS FAVORITOS */}
        <div className="text-center p-4">
        <div className="flex justify-between items-center p-4 bg-blue-500 text-white">
          <h3 className="text-lg font-semibold">Jogos Favoritos ♥</h3>
        </div>
          <div className="bg-white shadow-xl rounded-lg overflow-hidden">
              <Carrossel jogos={jogosFav} />
          </div>
        </div>

        {/* LISTAS QUE O USUARIO DESEJAR MOSTRAR: */}
        <div className="flex justify-center mt-16">
          <button className="text-lg flex items-center gap-2 px-8 py-2 rounded-md bg-indigo-500 text-white hover:bg-indigo-400 font-inter transition" onClick={openModal}>
            <MdPlaylistAdd size={25}/>
            Fixar Lista
          </button>
          <ToastContainer />
          </div>
        <div className="text-center p-4">
        <div className="flex justify-between items-center p-4 bg-blue-500 text-white">
          <h3 className="text-lg font-semibold">Minhas Listas Fixadas: </h3>
        </div>
        <div className="flex justify-between items-center p-4 bg-blue-500 text-white">
          <h3 className="text-lg font-semibold">• {listas[1].nome}</h3>
        </div>

        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          <Carrossel jogos={obtemJogos(1)} />
        </div>
        </div>
      </div>
  );
};

export default Perfil;
