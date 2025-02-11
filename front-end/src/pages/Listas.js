import React, { useEffect, useState} from "react";
import Carrossel from "../components/Carrossel";
import { FaArrowCircleRight } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { addLista } from "../slices/listasSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal from "react-modal";
import { MdAddCircleOutline } from "react-icons/md";
import { deleteLista } from "../slices/listasSlice";
import { fetchListas } from "../slices/listasSlice";
import { fetchPerfil } from "../slices/perfilSlice";

const Listas = ({listas, dados, usernameLogado }) => {

  const perfilLogado = fetchPerfil(usernameLogado);
  const user = useSelector((state) => state.auth?.user);
  const { username } = useParams();
  const status = useSelector((state) => state.listas.status);
  
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [novaListaNome, setNovaListaNome] = useState("");
  // const [listas, setListas] = useState([]);

  const listasUsuario = listas?.find((lista) => lista.username === username);
  console.log(listas);
  console.log(`oioi ${listasUsuario}`)

  function obtemJogos(idLista){
   // Encontra a lista correspondente ao idLista
  const listaEncontrada = listas.find((lista) => lista._id === idLista);
  
  if (!listaEncontrada || !listaEncontrada.jogosIds) {
    // Retorna um array vazio se a lista não for encontrada ou não tiver jogos
    return [];
  }

  // Filtra os jogos que correspondem aos IDs em jogosIds
  const jogosDaLista = dados.filter((jogo) =>
    listaEncontrada.jogosIds.includes(jogo._id)
  );
  console.log(jogosDaLista);

  console.log(jogosDaLista); // Verifica os jogos retornados no console
  return jogosDaLista;
  }

  const openNovaListaModal = () => {
    setIsModalOpen(true); 
  };

  const closeNovaListaModal = () => {
    setIsModalOpen(false); 
  };

  const handleNovaListaChange = (e) => {
    setNovaListaNome(e.target.value); 
  };

  const handleCriarNovaLista = () => {
    if (novaListaNome.trim()) {
      
      const novaLista = {
        nome: novaListaNome, 
        ids: [],
        username: user.username
      };
      
      dispatch(addLista({username: user.username, novaLista: novaLista}))
        .unwrap()
        .then(() => {
          toast.success(`Lista "${novaListaNome}" criada com sucesso!`);
          setNovaListaNome(""); // Limpa o campo de nome
          closeNovaListaModal(); // Fecha o modal
        })
        .catch((error) => {
          toast.error("Erro ao criar a lista.");
          console.error("Erro ao criar a lista:", error);
        });
    } else {
      toast.error("Por favor, insira um nome para a lista!");
    }
  };

  const handleDeletarLista = (idLista) => {
    if (window.confirm("Tem certeza que deseja deletar esta lista?")) {
      dispatch(deleteLista({ userId: perfilLogado.id, idLista }))
        .unwrap()
        .then(() => {
          toast.success("Lista deletada com sucesso!");
        })
        .catch((error) => {
          toast.error("Erro ao deletar a lista.");
          console.error("Erro ao deletar a lista:", error);
        });
    }
  };

  useEffect(() => {
    if (perfilLogado && perfilLogado.username) {
      dispatch(fetchListas(user.username));
    }
  }, [dispatch, perfilLogado, user.username]);

  if (status === "loading") return <div>Carregando...</div>;
  if (status === "failed") return <div>Erro ao carregar listas</div>;

  return (
    <>
      <Modal
        ariaHideApp={false}
        isOpen={isModalOpen}
        onRequestClose={closeNovaListaModal}
        contentLabel="Criar Nova Lista"
        className="bg-white p-6 rounded-lg w-96"
        overlayClassName="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50"
      >
        <h2 className="text-xl font-semibold mb-4 font-inter">
          Digite o nome da nova lista
        </h2>
        <input
          type="text"
          value={novaListaNome}
          onChange={handleNovaListaChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md mb-4 font-fira"
          placeholder="Nome da lista"
        />
        <div className="flex justify-between">
          <button
            onClick={closeNovaListaModal}
            className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-400 font-inter font-semibold"
          >
            Cancelar
          </button>
          <button
            onClick={handleCriarNovaLista}
            className="px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-400 font-inter font-semibold"
          >
            Criar Lista
          </button>
        </div>
      </Modal>

      <Helmet>
        <meta charSet="utf-8" />
        <title>Minhas Listas</title>
        <link rel="canonical" href="http://mysite.com/example" />
        <meta name="description" content="Página de jogo" />
      </Helmet>
      <div className="flex justify-between items-center w-full mx-auto my-0 px-10 py-10 bg-zinc-600 text-white font-inter">
        <h1 className="text-2xl font-bold">Minhas listas</h1>
        <button
          className="flex gap-2 px-5 py-1 items-center justify-center text-md rounded-lg bg-indigo-600 hover:bg-indigo-400 font-fira font-bold"
          onClick={openNovaListaModal}
        >
          <MdAddCircleOutline />
          Nova lista
        </button>
      </div>
      <section className="ml-5 mr-5">
        <div className="mt-5">
          {listas && listas.length > 0 ? (
            listas.map((item, index) => {
              const jogosLista = obtemJogos(item._id);
              return (
                <div key={index} className="flex flex-col">
                  <div className="flex justify-between items-center">
                    <Link
                      to={`/lista/${username}/${item._id}`}
                      className="text-2xl font-bold font-inter flex items-center gap-5 mt-10"
                    >
                      {item.nome}
                      <FaArrowCircleRight className="text-indigo-600" />
                    </Link>
                    <button
                      onClick={() => handleDeletarLista(item.id)}
                      className="text-red-600 hover:text-red-400 font-bold"
                    >
                      Deletar
                    </button>
                  </div>
                  {jogosLista.length !== 0 ? (
                    // console.log(jogosLista)
                    <Carrossel jogos={jogosLista} />
                  ) : (
                    <p className="mb-10 mt-2 font-fira">Lista vazia</p>
                  )}
                </div>
              );
            })
          ) : (
            <p className="text-black">Nenhuma lista encontrada.</p>
          )}
        </div>
      </section>
    </>
  );
};

export default Listas;
