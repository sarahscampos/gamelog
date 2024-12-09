import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeModal, setRating, setComment } from "../slices/reviewSlice";
import { addAvaliacoes } from "../slices/avaliacoesSlice";
import Avaliacao from "./Avaliacao";

const GameReviewModal = ({id,close}) => {
  const dispatch = useDispatch();

  const [newAvaliacao, setNewAvaliacao] = useState('');
  const [newAvaliacaoNota, setNewAvaliacaoNota] = useState(null);


  const handleSubmit = () => {
    if ((newAvaliacaoNota === null) || (newAvaliacaoNota > 10) || (newAvaliacaoNota < 0)) {
      alert("Por favor, insira uma nota valida antes de enviar.");
      return;
    }

    dispatch(addAvaliacoes({avaliacaoId:id, avaliacaoReview: newAvaliacao, avaliacaoNum : newAvaliacaoNota}))
    .then(() => {
      close();
    });
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-lg font-semibold mb-4">Avaliar Jogo</h2>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Nota (1-10):
          </label>
          <input
            type="number"
            min="1"
            max="10"
            value={newAvaliacaoNota || ""}
            onChange={(e) => setNewAvaliacaoNota(Number(e.target.value))}
            className="w-full border border-gray-300 rounded-lg p-2 mb-4"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Comentário (opcional):
          </label>
          <textarea
            value={newAvaliacao}
            onChange={(e) => setNewAvaliacao(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-2 resize-none"
            rows="4"
          />
        </div>
        <div className="mt-4 flex justify-end space-x-2">
          <button
            onClick={() => close()}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg"
          >
            Cancelar
          </button>
          <button
            onClick={handleSubmit}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
          >
            Enviar
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameReviewModal;
