import React, { useState } from "react";
import Modal from "react-modal";
import { toast } from "react-toastify";

const EditaPerfilModal = ({ isOpen, onClose, perfilLogado, editaPerfil }) => {
  const [formData, setFormData] = useState({
    nome: perfilLogado?.nomePerfil || "",
    avatar: perfilLogado?.avatar || "",
    descricao: perfilLogado?.descricao || "",
    localizacao: perfilLogado?.localizacao || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validação básica da URL do avatar
    if (formData.avatar && !/^https?:\/\/.*\.(jpg|jpeg|png|gif)$/i.test(formData.avatar)) {
      toast.error("Avatar URL inválida. Por favor, insira uma URL válida.");
      return;
    }

    editaPerfil(formData)
      .then(() => {
        toast.success("Perfil atualizado com sucesso!");
        onClose(); // Fecha o modal
      })
      .catch((error) => {
        console.error("Erro ao editar o perfil:", error);
        toast.error("Erro ao editar o perfil.");
      });
  };

  return (
    <Modal
      ariaHideApp={false}
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Editar Perfil"
      className="bg-white p-6 rounded-lg w-96"
      overlayClassName="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50"
    >
      <h2 className="text-xl font-semibold mb-4">Editar Perfil</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Nome */}
        <div>
          <label className="block font-medium mb-2" htmlFor="nome">
            Nome:
          </label>
          <input
            required
            type="text"
            id="nome"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            maxLength={25}
          />
          <p className="text-sm text-gray-500">{25 - formData.nome.length} caracteres restantes</p>
        </div>

        {/* Avatar URL */}
        <div>
          <label className="block font-medium mb-2" htmlFor="avatar">
            Avatar URL:
          </label>
          <input
            type="text"
            id="avatar"
            name="avatar"
            value={formData.avatar}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* Descrição */}
        <div>
          <label className="block font-medium mb-2" htmlFor="descricao">
            Descrição:
          </label>
          <textarea
            id="descricao"
            name="descricao"
            value={formData.descricao}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            maxLength={150}
          />
          <p className="text-sm text-gray-500">{150 - formData.descricao.length} caracteres restantes</p>
        </div>

        {/* Localização */}
        <div>
          <label className="block font-medium mb-2" htmlFor="localizacao">
            Localização:
          </label>
          <input
            type="text"
            id="localizacao"
            name="localizacao"
            value={formData.localizacao}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            maxLength={20}
          />
          <p className="text-sm text-gray-500">{20 - formData.localizacao.length} caracteres restantes</p>
        </div>

        {/* Botões de ação */}
        <div className="flex justify-between mt-4">
          <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-400">
            Salvar
          </button>
          <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-400">
            Cancelar
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default EditaPerfilModal;
