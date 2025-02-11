import React from "react";
import Modal from "react-modal";
import { atualizaPerfil } from "../slices/perfilSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

export const FixaListaModal = ({ isFixaListaModalOpen, closeFixaListaModal, listas, perfilLogado }) =>{
  const dispatch = useDispatch();
    const toggleFixaLista = (lista) => {
      // Verifica se a lista já está fixada
      const isListaFixada = perfilLogado?.listasFixadasIds.includes(lista.id);
    
      // Atualiza o array de IDs com base no estado atual
      const updatedListasFixadasIds = isListaFixada
        ? perfilLogado?.listasFixadasIds.filter((id) => id !== lista.id) // Remove a lista se já estiver fixada
        : [...perfilLogado?.listasFixadasIds, lista.id]; // Adiciona a lista se não estiver fixada
    
      const updatedUserData = {
        ...perfilLogado, // Mantém todas as outras informações do usuário
        listasFixadasIds: updatedListasFixadasIds, // Atualiza apenas as listas fixadas
      };
    
      // Dispara a ação para atualizar o perfil
      dispatch(atualizaPerfil(updatedUserData));
      toast.success(`A lista "${lista.nome}" foi ${isListaFixada ? "desfixada" : "fixada"} no perfil!`);
      /*
        .then(() => {
          const action = isListaFixada ? "desfixada" : "fixada";
          toast.success(`A lista "${lista.nome}" foi ${action} no perfil!`);
        })
        .catch((error) => {
          console.error("Erro ao atualizar as listas fixadas:", error);
          toast.error("Erro ao atualizar a lista no perfil.");
        });
      */
    };

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
            {listas && listas?.length > 0 && listas.map((lista, index) => (
              <li key={index} className="flex items-center">
                <input
                  type="checkbox"
                  checked={perfilLogado?.listasFixadasIds?.includes(lista.id) || false}
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

export default FixaListaModal;