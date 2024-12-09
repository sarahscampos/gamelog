import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Carrossel from '../components/Carrossel';
import background from "../assets/img/backgroundJogo.png";
import Modal from "react-modal"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from "react-redux";
import { createAsyncThunk } from '@reduxjs/toolkit';
import { MdPlaylistAdd, MdEdit } from "react-icons/md";
import { RiArrowGoBackFill } from "react-icons/ri";
import Loading from "../components/Loading";

const Perfil = ({listas, dados}) => {
  const { id } = useParams(); // Captura o ID do usuário na URL
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const [isFixaListaModalOpen, setIsFixaListaModalOpen] = useState(false);
  const [isEditaPerfilModalOpen, setIsEditaPerfilModalOpen] = useState(false);

  const navigate = useNavigate();


  const openFixaListaModal = () => {
    setIsFixaListaModalOpen(true);
  };

  const closeFixaListaModal = () => {
    setIsFixaListaModalOpen(false)
  }
  const openEditaPerfilModal = () => {
    setIsFixaListaModalOpen(true);
  };

  const closeEditaPerfilModal = () => {
    setIsFixaListaModalOpen(false)
  }

  function obtemJogos(index){
    const lista = listas && listas[index] && listas[index].ids
      ? dados.filter((jogo) => listas[index].ids.includes(jogo.id))
      : [];
    return lista;
  }
  const favIndex = listas && listas.findIndex((lista) => lista.nome === "Favoritos");
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
  
  const atualizaPerfil = createAsyncThunk('perfil/atualizaPerfil', async ({ updatedUserData }) => {
    const response = await fetch('http://localhost:3000/perfil/0', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedUserData),
    });
  
    if (!response.ok) {
      throw new Error(`Erro ao atualizar perfil: ${response.statusText}`);
    }
  
    const updatedUser = await response.json();
    return updatedUser;  // Retorna o perfil atualizado
  });

  const toggleFixaLista = (lista) => {
    // Verifica se a lista já está fixada
    const isListaFixada = user.listasFixadasIds.includes(lista.id);
  
    // Atualiza o array de IDs com base no estado atual
    const updatedListasFixadasIds = isListaFixada
      ? user.listasFixadasIds.filter((id) => id !== lista.id) // Remove a lista se já estiver fixada
      : [...user.listasFixadasIds, lista.id]; // Adiciona a lista se não estiver fixada
  
    const updatedUserData = {
      ...user, // Mantém todas as outras informações do usuário
      listasFixadasIds: updatedListasFixadasIds, // Atualiza apenas as listas fixadas
    };
  
    // Dispara a ação para atualizar o perfil
    dispatch(atualizaPerfil({ updatedUserData }))
      .then(() => {
        const action = isListaFixada ? "desfixada" : "fixada";
        toast.success(`A lista "${lista.nome}" foi ${action} no perfil!`);
      })
      .catch((error) => {
        console.error("Erro ao atualizar as listas fixadas:", error);
        toast.error("Erro ao atualizar a lista no perfil.");
      });
  };
  
  const editaPerfil = () =>{
    const updatedListasFixadasIds = [...user.listasFixadasIds];
    const updatedUserData = {
      ...user, // Mantém todas as outras informações do usuário
    };

    dispatch(atualizaPerfil({ updatedUserData }))
    .then(() => {
      toast.success();
      closeEditaPerfilModal();
    })
    .catch((error) => {
      console.error("Erro ao adicionar o jogo à lista:", error);
      toast.error("Erro ao fixar a lista no perfil.");
    });
  }

  if (loading) {
    return (
      <Loading />
    );
  }

  if (!user) {
    return (
      <div className="text-center mt-20 text-lg font-inter text-red-600">
        Não foi possível carregar o perfil.
      </div>
    );
  }
  
  return (
    
    <div style={{backgroundImage: `url(${background})`}} className="p-10">
      <div className="flex justify-between w-full mx-auto my-0 px-10 md:px-64 bg-fixed">
      <button onClick={() => navigate(-1)} /*bug de não ter pagina anterior?*/className="items-center gap-1 inline-flex px-4 py-2 rounded-lg border-2 border-cyan-600 text-white hover:bg-cyan-600 font-inter transition-all duration-300">
      <RiArrowGoBackFill />
        Voltar
      </button>
      </div>
      <div className="max-w-md mx-auto bg-white shadow-xl rounded-lg overflow-hidden">
        {/* Cabeçalho */}
        <div className="flex justify-between items-center p-4 bg-blue-500 text-white">
          <span className="text-sm font-semibold">{user.nome}</span>
          <button className="text-sm font-semibold" onClick={openEditaPerfilModal}>
            <MdEdit size={25}/>
            Editar Perfil
          </button>
          <ToastContainer />
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
          
        {/* AREA PRA LISTAS! - JOGOS FAVORITOS */}
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
          <button className="text-lg flex items-center gap-2 px-8 py-2 rounded-md bg-indigo-500 text-white hover:bg-indigo-400 font-inter transition" onClick={openFixaListaModal}>
            <MdPlaylistAdd size={25}/>
            Fixar Lista
          </button>
          <ToastContainer />
          </div>
        <div className="text-center p-4">
        <div className="flex justify-between items-center p-4 bg-blue-500 text-white">
          <h3 className="text-lg font-semibold">Minhas Listas Fixadas: </h3>
        </div>

        {/* Modal para fixar/desfixar listas no perfil do usuário */}
        <Modal
          ariaHideApp={false}
          isOpen={isFixaListaModalOpen}
          onRequestClose={closeFixaListaModal}
          contentLabel="Escolha as Listas"
          className="bg-white p-6 rounded-lg w-96"
          overlayClassName="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50"
        >
          <h2 className="text-xl font-semibold mb-4">Escolha as listas para fixar no Perfil</h2>
          <ul className="space-y-4">
            {listas && listas.length > 0 && listas.map((lista, index) => (
              <li key={index} className="flex items-center">
                <input
                  type="checkbox"
                  checked={user.listasFixadasIds?.includes(lista.id) || false}
                  onChange={() => toggleFixaLista(lista.id)}
                  className="mr-3"
                />
                <span>{lista.nome}</span>
              </li>
            ))}
          </ul>
          <button
            onClick={closeFixaListaModal}
            className="mt-4 px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-400"
          >
            Fechar
          </button>
        </Modal>

        {/* Exibindo as listas fixadas */}
        {user.listasFixadasIds && user.listasFixadasIds.length > 0 && user.listasFixadasIds.map((idLista) => {
          const index = listas.findIndex((lista) => lista.id === idLista);
          return (
            <div key={idLista} className="mb-4">
              {/* Cabeçalho da lista */}
              <div className="flex justify-between items-center p-4 bg-blue-500 text-white">
                <h3 className="text-lg font-semibold">• {listas[index]?.nome || "Nome da Lista Indisponível"}</h3>
              </div>

              {/* Carrossel com os jogos */}
              <div className="bg-white shadow-xl rounded-lg overflow-hidden">
                <Carrossel jogos={obtemJogos(index)} />
              </div>
            </div>
          );
        })}

        </div>
      </div>
  );
};

export default Perfil;
