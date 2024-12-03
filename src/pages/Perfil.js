import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

// quero poder escolher quais listas vou mostrar no perfil
// quero atualizar o perfil "teste" -> id 0 quando adicionar um jogo na lista, favoritos, etc.
// quero poder editar o perfil ao vivo ( mudar o db de alguma forma igual o joao! )

const Perfil = ({listas, dados}) => {
  const { id } = useParams(); // Captura o ID do usuário na URL
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`http://localhost:3000/perfil/${id}`);
        if (!response.ok) {
          throw new Error("Erro ao carregar o perfil do usuário");
        }
        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-blue-500"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="text-center mt-20 text-lg font-inter text-red-600">
        Não foi possível carregar o perfil.
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-blue-50 via-blue-100 to-blue-50 min-h-screen p-6">
      <div className="max-w-md mx-auto bg-white shadow-xl rounded-lg overflow-hidden">
        {/* Cabeçalho */}
        <div className="flex justify-between items-center p-4 bg-blue-500 text-white">
          <Link to="/" className="text-xl font-bold hover:underline">
            &larr; Voltar
          </Link>
          <span className="text-sm font-semibold">{user.nome}</span>
        </div>

        {/* Corpo do Perfil */}
        <div className="text-center p-4">
          <img
            src={user.avatar}
            alt={user.nome}
            className="w-24 h-24 rounded-full mx-auto shadow-lg"
          />
          <h2 className="mt-2 text-2xl font-semibold">{user.nome}</h2>
          <p className="text-gray-500">{user.descricao}</p>
          <p className="text-xs text-gray-400 mt-1">
            {user.localizacao} • Membro desde {user.membroDesde}
          </p>
        </div>

        {/* Estatísticas */}
        <div className="p-4">
          <h3 className="text-lg font-semibold">Estatísticas</h3>
          <div className="grid grid-cols-3 text-center">
            <div>
              <span className="text-lg font-bold">{user.analises}</span>
              <p className="text-gray-500 text-sm">Análises</p>
            </div>
            <div>
              <span className="text-lg font-bold">{user.media}</span>
              <p className="text-gray-500 text-sm">Média</p>
            </div>
            <div>
              <span className="text-lg font-bold">{user.amigos}</span>
              <p className="text-gray-500 text-sm">Amigos</p>
            </div>
          </div>
        </div>

        {/* Jogos Favoritos -> TROCAR PELOS DADOS DO listas[id] */}
        <div className="p-4">
          <h3 className="text-lg font-semibold">Jogos Favoritos ♥</h3>
          <div className="flex flex-wrap gap-2 mt-2">
            {listas[id].nome == "Favoritos" && (listas[id].nome == "Favoritos").length > 0 ? (
              (listas[id].nome == "Favoritos").map((jogoid) => (
                <Link
                  key={jogoid}
                  to={`/jogo/${jogoid}`} // Redireciona para pagina do jogo
                  className="block"
                >
                  <img // AQUI EU QUERO PODER USAR O CARROSEL QUE JA TEM PRONTO!
                    src={dados[jogoid].capa || "https://via.placeholder.com/100x150"}
                    alt={`Capa de ${dados[jogoid].nome}`}
                    className="w-20 h-28 rounded-lg shadow-md hover:shadow-lg transition"
                  />
                  <p className="text-xs text-center mt-1 text-gray-600">{dados[jogoid].nome}</p>
                </Link>
              ))
            ) : (
              <p className="text-gray-500">Nenhum jogo favorito.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Perfil;
