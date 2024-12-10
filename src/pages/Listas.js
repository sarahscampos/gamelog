import React, { useState} from "react";
import Carrossel from "../components/Carrossel";
import { FaArrowCircleRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useDispatch } from "react-redux";
import { addLista } from "../slices/listasSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal from "react-modal";
import { MdAddCircleOutline } from "react-icons/md";

const Listas = ({ listas, dados, usuarioLogado }) => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [novaListaNome, setNovaListaNome] = useState("");

  function obtemJogos(index){
    const lista = listas && listas[index] && listas[index].ids
      ? dados.filter((jogo) => listas[index].ids.includes(jogo.id))
      : [];
    return lista;
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
        id: listas.length,
        nome: novaListaNome, 
        ids: [], 
      };

      console.log(usuarioLogado.id)
      
      dispatch(addLista({userId: usuarioLogado.id, novaLista: novaLista}))
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
              const jogosLista = obtemJogos(index);
              return (
                <div key={index} className="flex flex-col">
                  <Link
                    to={`/lista/${index}`}
                    className="text-2xl font-bold font-inter flex items-center gap-5 mt-10"
                  >
                    {item.nome}
                    <FaArrowCircleRight className="text-indigo-600" />
                  </Link>
                  {jogosLista.length !== 0 ? 
                  <Carrossel jogos={jogosLista} />
                  :
                  <p className="mb-10 mt-2 font-fira">Lista vazia</p>
                  }
                </div>
              );
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
