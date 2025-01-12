import React, { useState, useEffect } from "react";

const Admin = () => {
  const [games, setGames] = useState([]);
  const [form, setForm] = useState({
    nome: "",
    colocacao: "",
    notaMedia: "",
    capa: "",
    dataLancamento: "",
    desenvolvedora: "",
    distribuidora: "",
    generos: [],
    sumario: "",
  });
  const [editId, setEditId] = useState(null);
  const [nextId, setNextId] = useState(null);  

  useEffect(() => {
    fetchGames();
  }, []);

  const fetchGames = async () => {
    try {
      const response = await fetch("http://localhost:3000/jogos");
      const data = await response.json();
      setGames(data);

      
      const nextId = Math.max(...data.map((game) => parseInt(game.id, 10)), 0);
      setNextId(nextId + 1); 
    } catch (error) {
      console.error("Erro ao buscar os jogos:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "generos") {
      setForm({ ...form, [name]: value.split(",").map((genre) => genre.trim()) });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleAddGame = async (e) => {
    e.preventDefault();
    try {
      const gameData = {
        id: nextId,  
        ...form,
        generos: Array.isArray(form.generos) ? form.generos : form.generos.split(",").map((genre) => genre.trim()),
      };

      if (editId) {
        await fetch(`http://localhost:3000/jogos/${editId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(gameData),
        });
      } else {
        await fetch("http://localhost:3000/jogos", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(gameData),
        });
      }
      setForm({
        nome: "",
        colocacao: "",
        notaMedia: "",
        capa: "",
        dataLancamento: "",
        desenvolvedora: "",
        distribuidora: "",
        generos: [],
        sumario: "",
      });
      setEditId(null);
      setNextId(nextId + 1);  
      fetchGames();
    } catch (error) {
      console.error("Erro ao salvar o jogo:", error);
    }
  };

  const handleEditGame = (game) => {
    setForm({
      nome: game.nome,
      colocacao: game.colocacao,
      notaMedia: game.notaMedia,
      capa: game.capa,
      dataLancamento: game.dataLancamento,
      desenvolvedora: game.desenvolvedora,
      distribuidora: game.distribuidora,
      generos: game.generos.join(", "),
      sumario: game.sumario,
    });
    setEditId(game.id);
  };

  const handleDeleteGame = async (id) => {
    try {
      await fetch(`http://localhost:3000/jogos/${id}`, {
        method: "DELETE",
      });
      fetchGames();
    } catch (error) {
      console.error("Erro ao deletar o jogo:", error);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto font-fira">
      <h1 className="text-2xl font-bold text-center mb-6">Admin - Gerenciar Jogos</h1>

      <form className="mb-6 space-y-4 flex flex-col mb-16" onSubmit={handleAddGame}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="text"
            name="nome"
            placeholder="Nome do Jogo"
            value={form.nome}
            onChange={handleInputChange}
            className="p-2 border border-gray-300 rounded"
            required
          />
          <input
            type="number"
            name="colocacao"
            placeholder="Ranking"
            value={form.colocacao}
            onChange={handleInputChange}
            className="p-2 border border-gray-300 rounded"
            required
          />
          <input
            type="number"
            name="notaMedia"
            placeholder="Nota Média"
            value={form.notaMedia}
            onChange={handleInputChange}
            className="p-2 border border-gray-300 rounded"
            step="0.1"
            required
          />
          <input
            type="text"
            name="capa"
            placeholder="URL da Capa"
            value={form.capa}
            onChange={handleInputChange}
            className="p-2 border border-gray-300 rounded"
          />
          <input
            type="date"
            name="dataLancamento"
            placeholder="Data de Lançamento"
            value={form.dataLancamento}
            onChange={handleInputChange}
            className="p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            name="desenvolvedora"
            placeholder="Desenvolvedora"
            value={form.desenvolvedora}
            onChange={handleInputChange}
            className="p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            name="distribuidora"
            placeholder="Distribuidora"
            value={form.distribuidora}
            onChange={handleInputChange}
            className="p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            name="generos"
            placeholder="Gêneros (separados por vírgulas)"
            value={form.generos}
            onChange={handleInputChange}
            className="p-2 border border-gray-300 rounded"
          />
          <textarea
            name="sumario"
            placeholder="Sumário"
            value={form.sumario}
            onChange={handleInputChange}
            className="p-2 border border-gray-300 rounded resize-none min-h-32"
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600"
        >
          {editId ? "Atualizar Jogo" : "Adicionar Jogo"}
        </button>
      </form>

      <table className="w-full border border-gray-300 mb-14">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">Nome</th>
            <th className="p-2 border">Ranking</th>
            <th className="p-2 border">Nota</th>
            <th className="p-2 border">Data de Lançamento</th>
            <th className="p-2 border">Ações</th>
          </tr>
        </thead>
        <tbody>
          {games.map((game) => (
            <tr key={game.id} className="hover:bg-gray-50">
              <td className="p-2 border">{game.nome}</td>
              <td className="p-2 border">{game.colocacao}</td>
              <td className="p-2 border">{game.notaMedia}</td>
              <td className="p-2 border">{game.dataLancamento}</td>
              <td className="p-2 border space-x-2 flex flex-col gap-2 items-center md:flex-row">
                <button
                  onClick={() => handleEditGame(game)}
                  className="px-2 py-1 bg-cyan-500 text-white rounded hover:bg-cyan-600"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDeleteGame(game.id)}
                  className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Deletar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Admin;
