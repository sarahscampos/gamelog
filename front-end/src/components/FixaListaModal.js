import React from "react";
import Modal from "react-modal";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { atualizaPerfil } from "../slices/perfilSlice"; 

const FixaListaModal = ({ isFixaListaModalOpen, closeFixaListaModal, perfilLogado }) => {
  const dispatch = useDispatch();

  const toggleFixaLista = (lista) => {
    const isListaFixada = perfilLogado.listasFixadasIds.includes(lista.id);

    const updatedListasFixadasIds = isListaFixada
      ? perfilLogado.listasFixadasIds.filter((id) => id !== lista.id)
      : [...perfilLogado.listasFixadasIds, lista.id];

    const updatedUserData = {
      ...perfilLogado,
      listasFixadasIds: updatedListasFixadasIds,
    };

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

  return (
    <Modal
      ariaHideApp={false}
      isOpen={isFixaListaModalOpen}
      onRequestClose={closeFixaListaModal}
      contentLabel="Escolha as Listas"
      className="bg-white p-6 rounded-lg w-96 font-fira"
      overlayClassName="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50"
    >
      <h2 className="text-xl font-semibold mb-4">Escolha as listas para fixar/desfixar no perfil</h2>
      <ul className="space-y-4">
        {perfilLogado.listas && perfilLogado.listas.length > 0 ? (
          perfilLogado.listas.map((lista) => (
            <li key={lista.id} className="flex items-center">
              <input
                type="checkbox"
                checked={perfilLogado.listasFixadasIds?.includes(lista.id) || false}
                onChange={() => toggleFixaLista(lista)}
                className="mr-3"
              />
              <span>{lista.nome}</span>
            </li>
          ))
        ) : (
          <p className="text-gray-500">Nenhuma lista disponível.</p>
        )}
      </ul>
      <button
        onClick={closeFixaListaModal}
        className="mt-4 px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-400"
      >
        Fechar
      </button>
    </Modal>
  );
};

export default FixaListaModal;
