import React, { useEffect, useState} from "react";
import { useNavigate, useParams } from "react-router-dom";
import Carrossel from '../components/Carrossel';
import background from "../assets/img/backgroundJogo.png";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from "react-redux";
import { MdEdit } from "react-icons/md";
import { RiArrowGoBackFill } from "react-icons/ri";
import Loading from "../components/Loading";
import { MdOutlinePushPin } from "react-icons/md";
import {Helmet} from "react-helmet";
import { fetchPerfil } from "../slices/perfilSlice"
import { logout } from "../slices/loginSlice"; // Importe a ação de logout
import {FixaListaModal} from "../components/FixaListaModal";
import {EditaPerfilModal} from "../components/EditaPerfilModal";

// QUERO IMPLEMENTAR: - tela de todas as avaliacoes do usuario
// - nota do usuario pros jogos aparecendo junto aos jogos

const Perfil = ({listas, dados, usernameLogado}) => {
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
  
    navigate("/login");
  };

  const { username } = useParams(); // Captura o ID do usuário na URL
  const [anyUser, setAnyUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const [isFixaListaModalOpen, setIsFixaListaModalOpen] = useState(false);
  const [isEditaPerfilModalOpen, setIsEditaPerfilModalOpen] = useState(false);

  const openFixaListaModal = () => setIsFixaListaModalOpen(true);

  const closeFixaListaModal = () => setIsFixaListaModalOpen(false);

  const openEditaPerfilModal = () => setIsEditaPerfilModalOpen(true);

  const closeEditaPerfilModal = () => setIsEditaPerfilModalOpen(false);

  function obtemJogos(index){
    const lista = listas && listas[index] && listas[index].ids
      ? dados.filter((jogo) => listas[index].ids.includes(jogo.id))
      : [];
    return lista;
  }

  const perfilLogado = useSelector((state) => state.perfil?.dados); // Pega o perfil logado salvo no redux
  console.log("PERFIL LOGADO: " + perfilLogado)

  const favIndex = listas && listas.findIndex((lista) => lista.nome === "Favoritos");
  const jogosFav = obtemJogos(favIndex);

  useEffect(() => {
    if (username) {
      dispatch(fetchPerfil(username));
    }
  }, [username, dispatch]);
  
  
  useEffect(() => {
    if (usernameLogado) {
      dispatch(fetchPerfil(usernameLogado)); // perfil logado do redux!
    }
  }, [usernameLogado, dispatch]);
  
  
  useEffect(() => {
    // se for diferente do logado, fetch!
    if (username && username !== usernameLogado) {
      const fetchUser = async () => {
        try {
          const response = await fetch(`http://localhost:3000/perfil/${username}`);
          if (!response.ok) throw new Error("Erro ao carregar o perfil do usuário");
          const userData = await response.json();
          setAnyUser(userData);
        } catch (error) {
          console.error("Erro:", error.message);
          setAnyUser(null);
        } finally {
          setLoading(false);
        }
      };
      fetchUser();
    } else {
      // se for o perfilLogado:
      setAnyUser(perfilLogado);
      setLoading(false);
    }
  }, [username, usernameLogado, perfilLogado]); // trigga quando um dos dois muda
  

  console.log("ANY USER: " + anyUser);

  
  if (loading) {
    return <Loading />;
  }
  
 
  if (!anyUser && !perfilLogado) {
    return <div className="text-center mt-20 text-lg font-inter text-red-600">Não foi possível carregar o perfil.</div>;
  }

  /*
  if (loading) {
    return (
      <>
      <Loading />
      </>
    );
  }
  */

  if (!perfilLogado) {
    return (
      <div className="text-center mt-20 text-lg font-inter text-red-600">
        Não foi possível carregar o perfil.
      </div>
    );
  }

  //Página
  return (
<>
    <Helmet>
    <meta charSet="utf-8" />
    <title>Perfil</title>
    <link rel="canonical" href="http://mysite.com/example" />
    <meta name="description" content="Página principal" />
  </Helmet>


    <div style={{backgroundImage: `url(${background})`}} className="p-10">
      <div className="flex justify-between w-full mx-auto my-0 px-10 md:px-64 bg-fixed">
      <button onClick={() => navigate(-1)} className="items-center gap-1 flex px-4 py-2 rounded-lg border-2 border-cyan-600 text-white hover:bg-cyan-600 font-inter transition-all duration-300 mb-3 text-left">
      <RiArrowGoBackFill />
        Voltar
      </button>
      </div>
      <div className="max-w-md mx-auto bg-white shadow-xl rounded-lg overflow-hidden">
        {/* Cabeçalho */}
        <div className="flex justify-between p-4 bg-blue-500 text-white">
          <span className="text-sm font-semibold">{anyUser?.nomePerfil}</span>
          {username === usernameLogado && (
    <div className="flex items-center gap-3">
      <button className="flex items-center text-sm font-semibold" onClick={openEditaPerfilModal}>
        <MdEdit size={25} />
        Editar Perfil
      </button>
      <button
        className="flex items-center text-sm font-semibold bg-red-500 px-3 py-1 rounded hover:bg-red-600 transition-all"
        onClick={handleLogout}
      >
        Sair
      </button>
    </div>
  )}
        </div>

        <EditaPerfilModal
          perfilLogado={perfilLogado}
          username={username}
          isEditaPerfilModalOpen={isEditaPerfilModalOpen}
          closeEditaPerfilModal={closeEditaPerfilModal}
         />

        <ToastContainer />
        

        {/* Corpo do Perfil */}
        <div className="text-center p-4 font-inter">
          <img
            src={anyUser?.avatar}
            alt={anyUser?.nomePerfil}
            className="w-24 h-24 rounded-full mx-auto shadow-lg"
          />
          <h2 className="mt-2 text-2xl font-semibold">{anyUser?.nomePerfil}</h2>
          <p className="text-gray-500 break-all">{anyUser?.descricao}</p>
          <p className="text-xs text-gray-400 mt-1">
            {anyUser?.localizacao} • Membro desde {anyUser?.membroDesde}
          </p>
        </div>

        {/* Estatísticas */}
        <div className="text-center p-4 font-inter">
          <h3 className="text-lg font-semibold">Estatísticas</h3>
          <div className="grid grid-cols-3 text-center">
            <div>
              <span className="text-lg font-bold">{anyUser?.analises}</span>
              <p className="text-gray-500 text-sm">Avaliações</p>
            </div>
            <div>
              <span className="text-lg font-bold">{anyUser?.media}</span>
              <p className="text-gray-500 text-sm">Média</p>
            </div>
            <div>
              <span className="text-lg font-bold">{anyUser?.amigos}</span>
              <p className="text-gray-500 text-sm">Amigos</p>
            </div>
          </div>
        </div>
        </div>
          
        {/* AREA PRA LISTAS! - JOGOS FAVORITOS */}
        <div className="text-center p-4">
        <div className="flex justify-between items-center p-4 bg-blue-500 rounded-md text-white mb-1 ">
          <h3 className="text-lg font-semibold">Jogos Favoritos ♥</h3>
        </div>
          <div className="bg-white shadow-xl rounded-md overflow-hidden">
              <Carrossel jogos={jogosFav} />
          </div>
        </div>

        {/* LISTAS QUE O perfilLogado DESEJAR MOSTRAR: */}
        <div className="flex justify-center mt-8">
          <button className="text-lg flex items-center gap-2 px-8 py-2 rounded-md bg-indigo-500 text-white hover:bg-indigo-400 font-inter transition" onClick={openFixaListaModal}>
            <MdOutlinePushPin size={20}/>
          
            Fixar Lista
          </button>
          <ToastContainer />
          </div>
        <div className="text-center p-4">
        <div className="flex justify-between items-center p-4 bg-gradient-to-tl from-indigo-600 to-cyan-600 text-white rounded-md  mb-5">
          <h3 className="text-lg font-semibold font-inter">Minhas Listas Fixadas</h3>
        </div>

        <FixaListaModal
          isFixaListaModalOpen={isFixaListaModalOpen}
          closeFixaListaModal={closeFixaListaModal}
          listas={listas}
          perfilLogado={perfilLogado}
        />

        {/*PRINTANDO LISTAS*/}
        {perfilLogado?.listasFixadasIds && perfilLogado?.listasFixadasIds.length > 0 && perfilLogado?.listasFixadasIds.map((idLista) => {
          const lista = listas.find((l) => l.id === idLista);
          return lista ? (
            <div key={idLista} className="mb-10">
              {/* Cabeçalho da lista */}
              <div className="flex justify-between items-center p-4 bg-blue-500 text-white rounded-md mb-1">
                <h3 className="text-lg font-semibold font-fira">• {lista.nome}</h3>
              </div>

              {/* Carrossel com os jogos */}
                <div className="bg-white shadow-xl rounded-lg overflow-hidden">
                  <Carrossel jogos={obtemJogos(lista.id)} />
                </div>
              </div>
              ) : null;
            })}

        </div>
      </div>
      </>
  );
};

export default Perfil;
