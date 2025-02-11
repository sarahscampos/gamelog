import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

const Comentario = ({ post, username }) => {
  const dispatch = useDispatch();
  
  const [perfil, setPerfil] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  /*
  const dataHora = new Date(post.createdAt).toLocaleString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });*/
  
  useEffect(() => {
    const fetchPerfil = async () => {
      try {
        const response = await fetch(`http://localhost:3000/perfil/${username}`);
        if (!response.ok) {
          throw new Error('Erro ao carregar perfil do usuário');
        }
        const data = await response.json();
        setPerfil(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (username) {
      fetchPerfil(); 
    }
  }, [username]);

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (error) {
    return <div>Erro: {error}</div>;
  }

  if (!perfil) {
    return (
      <div className="p-4 bg-white border border-gray-200 rounded-md shadow">
        <div className="flex items-center gap-3 mb-3">
          <img 
            src="default-avatar-url" 
            alt="Usuário Anônimo" 
            className="w-10 h-10 rounded-full"
          />
          <div>
            <span className="font-semibold text-gray-800">Usuário Anônimo</span>
          </div>
        </div>
        <p className="break-words text-left">{post.coment}</p>
        <span className="text-sm text-gray-500">{post.createdAt}</span>
      </div>
    );
  }

  // renderizar so depois do fetch
  return (
    <div className="p-4 bg-white border border-gray-200 rounded-md shadow">
      <div className="flex text-wrap items-center gap-3 mb-3">
        <img 
          src={perfil?.avatar || 'default-avatar-url'} 
          alt={perfil?.username || 'Usuário Anônimo'} 
          className="w-10 h-10 rounded-full"
        />
        <div>
          <span className="font-semibold text-gray-800">{perfil?.username || 'Usuário Anônimo'}</span>
        </div>
      </div>
      <p className="break-words text-left">{post.coment}</p>
      <span className="text-sm text-gray-500">{post.createdAt}</span>
    </div>
  );
};

export default Comentario;
