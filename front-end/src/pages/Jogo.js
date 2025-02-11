import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Modal from 'react-modal';
import { RiArrowGoBackFill } from "react-icons/ri";
import { MdPlaylistAdd } from "react-icons/md";
import { FaRankingStar } from "react-icons/fa6";
import Loading from "../components/Loading"
import { addJogoToList } from "../slices/listasSlice";
import { useDispatch, useSelector } from "react-redux";
import { MdOutlineRateReview } from "react-icons/md";
import Avaliacao from "../components/Avaliacao";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Helmet} from "react-helmet";
import backgroundJogo from "../assets/img/backgroundJogo.png";
import ReviewModal from "../components/ReviewModal";
import {deleteAvaliacao} from "../slices/avaliacoesSlice";

const Jogo = ({dados, avaliacaoInfo, listas}) => {

  const perfilLogado = useSelector((state) => state.perfil.dados);
  const token = useSelector((state) => state.auth?.token);

  const { id } = useParams();
  const dispatch = useDispatch();
 
  const jogo = dados.find((jogo) => jogo._id === id);
  const navigate = useNavigate();

  const [isModalAvaliacaoOpen, setIsModalAvaliacaoOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedList, setSelectedList] = useState("");
  const [avaliacoesJogo, setAvaliacoesJogo] = useState();

  const openModalAvaliacao = () => {
    setIsModalAvaliacaoOpen(true);
  };

  const closeModalAvaliacao = () => {
    setIsModalAvaliacaoOpen(false);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false)
  }

  const deletarAvaliacao = () =>{
    console.log(token)
    dispatch(deleteAvaliacao({jogoId: id, usuarioId: perfilLogado?.username, avaliacaoId: avaliacaoUsuario._id, token: token}))
  }
  
 const user = useSelector((state) => state.auth?.user);

  const addToList = (list) => {

    setSelectedList(list);
    dispatch(addJogoToList({username: user?.username, idLista: list._id, idJogo: id })) // por enquanto
    .then(() => {
      toast.success(`${jogo.nome} foi adicionado à lista ${list.nome}!`);
      closeModal();
    })
    .catch((error) => {
      console.error("Erro ao adicionar o jogo à lista:", error);
    });
  }

  useEffect(() => {
    fetch(`http://localhost:3000/avaliacoes/${id}`).then((r) => r.json()).then(setAvaliacoesJogo);
  }, [id])
  

  {/* por enquanto usuarioId = 0 */}
  const avaliacaoUsuario = avaliacoesJogo?.find(avaliacao => avaliacao.username === user?.username);

  if (!jogo) {
    return <Loading />;
  }

  return (
    <>
    <Helmet>
      <meta charSet="utf-8" />
      <title>{`${jogo.nome}`}</title>
      <link rel="canonical" href="http://mysite.com/example" />
      <meta name="description" content="Página de jogo" />
    </Helmet>
    <section style={{backgroundImage: `url(${backgroundJogo})`}} className="w-full mx-auto my-0 px-10 md:px-64 py-20 bg-fixed">

    <div className="flex justify-between">
      <button onClick={() => navigate(-1)} /*bug de não ter pagina anterior?*/className="items-center gap-1 inline-flex px-4 py-2 rounded-lg border-2 border-cyan-600 text-white hover:bg-cyan-600 font-inter transition-all duration-300">
      <RiArrowGoBackFill />
        Voltar
      </button>
      <Link to='/Ranking' className="items-center gap-1 inline-flex px-4 py-2 rounded-lg border-2 border-cyan-600 text-white hover:bg-cyan-600 font-inter transition-all duration-300">
      <FaRankingStar/>
      Ranking {jogo.colocacao}
      </Link>
    </div>

    <div className="flex flex-col items-center m-10">
        <img src={`${jogo.capa}`} alt={jogo.nome} className="w-52 h-72 ring-4 ring-indigo-700 rounded-md mb-6 lg:h-96 lg:w-72"/>
        <h2 className ="text-xl sm:text-2xl lg:text-3xl font-inter font-bold text-white mb-3">{jogo.nome}</h2>
        <p className="text-white rounded bg-gradient-to-tl from-indigo-500 to-cyan-600 px-5 py-2 font-fira">Nota média: {jogo.notaMedia}</p>

      </div>
      
      <div className="flex flex-col items-center gap-6 justify-center mt-16">
          <button
            className="text-lg flex items-center gap-2 px-8 py-2 rounded-md bg-indigo-500 text-white hover:bg-indigo-400 font-inter transition"
            onClick={openModal}
          >
            <MdPlaylistAdd size={25} />
            Adicionar à lista
          </button>

          {avaliacaoUsuario ? (
            <div className="flex flex-col items-center">
              <p className="text-white text-sm mb-2">
                Sua nota: <span className="font-bold">{avaliacaoUsuario.nota}</span>
              </p>
              <button
                className="text-lg mb-2 flex items-center gap-2 px-8 py-2 rounded-md bg-green-500 text-white hover:bg-green-400 font-inter transition"
                onClick={openModalAvaliacao}
              >
                <MdOutlineRateReview size={25} />
                Editar avaliação
              </button>
              <button
                className="text-lg flex items-center gap-2 px-8 py-2 rounded-md bg-red-500 text-white hover:bg-red-400 font-inter transition"
                onClick={deletarAvaliacao}
              >
                <MdOutlineRateReview size={25} />
                Remover avaliação
              </button>
            </div>
          ) : (
            <button
              className="text-lg flex items-center gap-2 px-8 py-2 rounded-md bg-cyan-600 text-white hover:bg-cyan-500 font-inter transition"
              onClick={openModalAvaliacao}
            >
              <MdOutlineRateReview size={25} />
              Avaliar jogo
            </button>
          )}
          <ToastContainer />
        </div>
      </section>


 {/* modal para adicionar o jogo em listas, informações a partir da lista de listas do usuario*/}
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
              onClick={() => addToList(lista)}
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

      <Modal
        ariaHideApp={false} 
        isOpen={isModalAvaliacaoOpen}
        onRequestClose={closeModalAvaliacao}
        contentLabel="Avalie o jogo"
        className="bg-white p-6 rounded-lg w-96"
        overlayClassName="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50"
      >
        <ReviewModal id = {id} close = {closeModalAvaliacao}/>
      </Modal>
  
  <section className="mx-auto my-0 px-10 md:px-64 py-20">

    <div className="flex flex-col gap-3 mt-7 font-fira">
      <div className = "flex space-x-4 mb-7">
        {jogo.generos.map((genero, index) => {
          return <p key={jogo.id} className = "text-lg font-medium text-white px-3 py-1 rounded bg-zinc-500">{genero}</p>
        })}
      </div>

      {/* <hr class="border-2"> */}
      <div className = "flex justify-between text-sm sm:text-lg font-medium">
      <h2 className = "text-sm sm:text-lg">Data de lançamento</h2>
      <h2 className = "text-sm sm:text-lg">{jogo.dataLancamento}</h2>
      </div>
      <div className = "flex justify-between text-sm sm:text-lg font-medium">
        <h2 className = "text-sm sm:text-lg">Desenvolvedora</h2>
        <h2 className = "text-sm sm:text-lg">{jogo.desenvolvedora}</h2>
      </div>
      <div className = "flex justify-between text-sm sm:text-lg font-medium">
        <h2 className = "text-sm sm:text-lg">Distribuidora</h2>
        <h2 className = "text-sm sm:text-lg">{jogo.distribuidora}</h2>
      </div>

      {/* <hr class="border-2"> */}
    </div>
  </section>

  <section className="bg-zinc-300 mx-auto my-5 px-10 text-left md:px-64 py-20">
    <h2 className="text-2xl p-4 font-bold font-inter">Sumário</h2>
      <div className="flex space-x-4 p-4 w-full">
        <p className="font-fira">
          {jogo.sumario}
        </p>
      </div>
    
  </section>
  
  {/* PRINTANDO AS AVALIACOES! */}
  <section>
    <section className = "mx-auto my-5 px-10 text-left md:px-64 py-20">
      <h2 className="text-2xl p-4 font-bold font-inter">Avaliações</h2>
    </section>
    
    {/* substituir 0 pelo userID real*/}
    <section className = "mx-auto my-5 px-10 text-left md:px-64">
      { 
      avaliacoesJogo?.length ? (
        <Avaliacao dadosAvaliacao={avaliacoesJogo.at(-1)}/>
      ) : (
        <p>Não possui avaliações</p>
      )
    }
    </section>
    <div className="flex justify-center">
            <Link to={`/avaliacoes/${id}`} className="px-4 py-2 rounded-lg bg-indigo-500 text-white hover:bg-indigo-400 font-inter transition" >Ver mais avaliações</Link>
          </div>
  </section>

  <section>
        <div className="mx-auto my-0 px-10 text-center md:px-64 py-20"> 
      <div className="flex items-center gap-2 flex-col py-4 px-8 bg-gradient-to-tl from-indigo-500 to-cyan-600 rounded-lg w-full mb-8">
        
        <Link to={`/forum/${id}`} className="text-white text-2xl px-4 py-2 font-inter font-bold underline decoration-solid"> Acesse o fórum de {jogo.nome}</Link>
        <p className="text-gray-300 text-md"> Converse • Tire dúvidas • Compartilhe curiosidades</p>

      </div>

    </div>
  </section>

    </>
  );
}

export default Jogo;
