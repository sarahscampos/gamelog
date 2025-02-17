import React, { useState } from "react";
import Modal from "react-modal";
import { atualizaPerfil } from "../slices/perfilSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

export const EditaPerfilModal = ({perfilLogado, username, isEditaPerfilModalOpen, closeEditaPerfilModal}) => {
  const [formData, setFormData] = useState({ username: username, nomePerfil: "", avatar: "", descricao: "", localizacao: "" , ...perfilLogado});
  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  /*
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };*/

  const dispatch = useDispatch()

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

export default EditaPerfilModal;