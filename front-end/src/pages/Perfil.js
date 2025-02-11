import React, { useEffect, useState} from "react";
import { useNavigate, useParams } from "react-router-dom";
import Carrossel from '../components/Carrossel';
import background from "../assets/img/backgroundJogo.png";
import Modal from "react-modal"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from "react-redux";
import { MdEdit } from "react-icons/md";
import { RiArrowGoBackFill } from "react-icons/ri";
import Loading from "../components/Loading";
import { MdOutlinePushPin } from "react-icons/md";
import {Helmet} from "react-helmet";
import { atualizaPerfil } from "../slices/perfilSlice";
import { fetchPerfil } from "../slices/perfilSlice"
import { logout } from "../slices/loginSlice"; // Importe a ação de logout

// QUERO IMPLEMENTAR: - tela de todas as avaliacoes do usuario
// - nota do usuario pros jogos aparecendo junto aos jogos

const Perfil = ({listas, dados, usernameLogado}) => {
  
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  
  
    navigate("/login");
  };

  const { username } = useParams(); // Captura o ID do usuário na URL
  const [anyUser, setAnyUser] = useState(null);
  const [loading, setLoading] = useState(true);

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
    setIsEditaPerfilModalOpen(true);
  };

  const closeEditaPerfilModal = () => {
    setIsEditaPerfilModalOpen(false)
  }

  function obtemJogos(index){
    const lista = listas && listas[index] && listas[index].ids
      ? dados.filter((jogo) => listas[index].ids.includes(jogo.id))
      : [];
    return lista;
  }

  const perfilLogado = useSelector((state) => state.perfil.dados); // Pega o perfil logado salvo no redux

  const favIndex = listas && listas.findIndex((lista) => lista.nome === "Favoritos");
  const jogosFav = obtemJogos(favIndex);

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
  }, [username, usernameLogado]); // trigga quando um dos dois muda
  
  if (loading) {
    return <Loading />;
  }

  if (!anyUser && !perfilLogado) {
    return <div className="text-center mt-20 text-lg font-inter text-red-600">Não foi possível carregar o perfil.</div>;
  }

  const toggleFixaLista = (lista) => {
    // Verifica se a lista já está fixada
    const isListaFixada = perfilLogado.listasFixadasIds.includes(lista.id);
  
    // Atualiza o array de IDs com base no estado atual
    const updatedListasFixadasIds = isListaFixada
      ? perfilLogado.listasFixadasIds.filter((id) => id !== lista.id) // Remove a lista se já estiver fixada
      : [...perfilLogado.listasFixadasIds, lista.id]; // Adiciona a lista se não estiver fixada
  
    const updatedUserData = {
      ...perfilLogado, // Mantém todas as outras informações do usuário
      listasFixadasIds: updatedListasFixadasIds, // Atualiza apenas as listas fixadas
    };
  
    // Dispara a ação para atualizar o perfil
    dispatch(atualizaPerfil(updatedUserData))
      .then(() => {
        const action = isListaFixada ? "desfixada" : "fixada";
        toast.success(`A lista "${lista.nome}" foi ${action} no perfil!`);
      })
      .catch((error) => {
        console.error("Erro ao atualizar as listas fixadas:", error);
        toast.error("Erro ao atualizar a lista no perfil.");
      });
  };



  //Componentes Modais
  const FixaListaModal = () =>{
    return(
    <Modal
          ariaHideApp={false}
          isOpen={isFixaListaModalOpen}
          onRequestClose={closeFixaListaModal}
          contentLabel="Escolha as Listas"
          className="bg-white p-6 rounded-lg w-96 font-fira"
          overlayClassName="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50"
        >
          <h2 className="text-xl font-semibold mb-4 ">Escolha as listas para fixar/desfixar no perfil</h2>
          <ul className="space-y-4">
            {listas && listas.length > 0 && listas.map((lista, index) => (
              <li key={index} className="flex items-center">
                <input
                  type="checkbox"
                  checked={perfilLogado.listasFixadasIds?.includes(lista.id) || false}
                  onChange={() => toggleFixaLista(lista)}
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
    )
  }

  const editaPerfil = (updateData) =>{
      const updatedUserData = {
        ...perfilLogado, // Mantém as informações existentes
        ...updateData, // Sobrescreve com as novas informações
      };

    dispatch(atualizaPerfil(updatedUserData))
    .then(() => {
      toast.success();
      closeEditaPerfilModal();
    })
    .catch((error) => {
      console.error("Erro ao editar o perfil:", error);
      toast.error("Erro ao editar o perfil.");
    });
  }

  const EditaPerfilModal = () => {
    const [formData, setFormData] = useState(perfilLogado);
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      editaPerfil(formData); // Chama a função com os dados atualizados
    };
    

    return (
    <Modal
      ariaHideApp={false}
      isOpen={isEditaPerfilModalOpen}
      onRequestClose={closeEditaPerfilModal}
      contentLabel="Editar Perfil"
      className="bg-white p-6 rounded-lg w-96"
      overlayClassName="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50"
    >
      <h2 className="text-xl font-semibold mb-4">Editar Perfil</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium mb-2" htmlFor="nomePerfil">Nome de Perfil:</label>
          <input
            required
            type="text"
            id="nomePerfil"
            name="nomePerfil"
            value={formData.nomePerfil}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            maxLength={25}
          />
          <p className="text-sm text-gray-500">{25 - formData.nomePerfil?.length} caracteres restantes</p>
        </div>
        <div>
          <label className="block font-medium mb-2" htmlFor="avatar">Avatar URL:</label>
          <input
            type="text"
            id="avatar"
            name="avatar"
            value={formData.avatar}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="block font-medium mb-2" htmlFor="descricao">Descrição:</label>
          <textarea
            id="descricao"
            name="descricao"
            value={formData.descricao}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            maxLength={150}
          />
          <p className="text-sm text-gray-500">{150 - formData.descricao?.length} caracteres restantes</p>
        </div>
        <div>
          <label className="block font-medium mb-2" htmlFor="localizacao">Localização:</label>
          <input
            type="text"
            id="localizacao"
            name="localizacao"
            value={formData.localizacao}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            maxLength={20}
          />
          <p className="text-sm text-gray-500">{20 - formData.localizacao?.length} caracteres restantes</p>
        </div>
        <div className="flex justify-between mt-4">
          <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-400">
            Salvar
          </button>
          <button
            type="button"
            onClick={closeEditaPerfilModal}
            className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-400"
          >
            Cancelar
          </button>
        </div>
      </form>
    </Modal>

    )
  };

  if (loading) {
    return (
      <>
      <Loading />
      </>
    );
  }

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
          <span className="text-sm font-semibold">{anyUser.nomePerfil}</span>
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
        <EditaPerfilModal />
        <ToastContainer />
        

        {/* Corpo do Perfil */}
        <div className="text-center p-4 font-inter">
          <img
            src={anyUser.avatar}
            alt={anyUser.nomePerfil}
            className="w-24 h-24 rounded-full mx-auto shadow-lg"
          />
          <h2 className="mt-2 text-2xl font-semibold">{anyUser.nomePerfil}</h2>
          <p className="text-gray-500 break-all">{anyUser.descricao}</p>
          <p className="text-xs text-gray-400 mt-1">
            {anyUser.localizacao} • Membro desde {anyUser.membroDesde}
          </p>
        </div>

        {/* Estatísticas */}
        <div className="text-center p-4 font-inter">
          <h3 className="text-lg font-semibold">Estatísticas</h3>
          <div className="grid grid-cols-3 text-center">
            <div>
              <span className="text-lg font-bold">{anyUser.analises}</span>
              <p className="text-gray-500 text-sm">Avaliações</p>
            </div>
            <div>
              <span className="text-lg font-bold">{anyUser.media}</span>
              <p className="text-gray-500 text-sm">Média</p>
            </div>
            <div>
              <span className="text-lg font-bold">{anyUser.amigos}</span>
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

        <FixaListaModal/>

        {/*PRINTANDO LISTAS*/}
        {perfilLogado.listasFixadasIds && perfilLogado.listasFixadasIds.length > 0 && perfilLogado.listasFixadasIds.map((idLista) => {
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
