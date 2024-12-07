import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Carrossel from '../components/Carrossel';
import logo from "../assets/img/logoGAMELOG2.svg";
import background from "../assets/img/backgroundJogo.png";

// quero poder escolher quais listas vou mostrar no perfil
// quero atualizar o perfil "teste" -> id 0 quando adicionar um jogo na lista, favoritos, etc.
// quero poder editar o perfil ao vivo ( mudar o db de alguma forma igual o joao! )

const Perfil = ({listas, dados}) => {
  const { id } = useParams(); // Captura o ID do usuário na URL
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  function obtemJogos(index){
    const lista = listas && listas[index]["ids"]
    ? dados.filter((jogo) => listas[index]["ids"].includes(jogo.id)) : [];
    return lista;
  }
  const favIndex = listas.findIndex((lista) => lista.nome === "Favoritos");
  const jogosFav = obtemJogos(favIndex);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        //const response = await fetch(`http://localhost:3000/perfil/${id}`);
        const response = await fetch(`http://localhost:3000/perfil/0`);
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
        </div>
        
        {/* AREA PRA LISTAS */}
        {/* JOGOS FAVORITOS */}
        <div className="p-4">
          <h3 className="text-lg font-semibold">Jogos Favoritos ♥</h3>
            <Carrossel jogos={jogosFav} />
        </div>
        <h3 className="text-lg font-semibold">Minhas Listas Fixadas: </h3>
        {/* LISTAS QUE O USUARIO DESEJAR MOSTRAR: */}
        <div className="p-4">
          <h3 className="text-lg font-semibold">{listas[1].nome}</h3>
            <Carrossel jogos={obtemJogos(1)} />
        </div>
      </div>    
  );
};

export default Perfil;
