import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const Comentario = ({ post }) => {
  const dispatch = useDispatch();
  
  const [perfil, setPerfil] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editando, setEditando] = useState(false);
  const [novoComentario, setNovoComentario] = useState(post.coment);

  const usernameLogado = useSelector((state) => state.auth?.user.username);
  
  const dataHora = new Date(post.createdAt).toLocaleString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  useEffect(() => {
    const fetchPerfil = async () => {
      try {
        const response = await fetch(`http://localhost:3000/perfil/${post.username}`);
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

    if (post.username) {
      fetchPerfil(); 
    }
  }, [post.username]);

  
  const deletarComentario = async (post) => {
    try {
      const response = await fetch(`http://localhost:3000/forum/${post.gameId}/${post._id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
        throw new Error('Erro ao excluir comentário');
      }
  
      alert("comentario deletado!");
      return await response.json();
    } catch (error) {
      console.error(error.message);
      throw error;
    }
  };

  const atualizarComentario = async (post, novoComentario) => {
    try {
      const response = await fetch(`http://localhost:3000/forum/${post.gameId}/${post._id}`, {
        method: 'PATCH', // Atualização
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ coment: novoComentario }),
      });
  
      if (!response.ok) {
        throw new Error('Erro ao atualizar o comentário');
      }
  
      const data = await response.json();
      console.log('Comentário atualizado com sucesso:', data);
      
      // Aqui você pode atualizar o estado local ou o estado global
      // Exemplo:
      // setComentarios(prev => prev.map(coment => coment.id === id ? data : coment));
  
    } catch (error) {
      console.error('Erro ao atualizar comentário:', error);
    }
  };

  const editarComentario = () => {
    setEditando(true);
  };

  const salvarEdicao = () => {
    if (novoComentario.trim() === "") return;

    atualizarComentario(post, novoComentario); // Chama a função de atualização
    setEditando(false);
  };

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
    <div className="flex items-center justify-between mb-3">
      <div className="flex items-center gap-3">
        <img
          src={perfil?.avatar || "default-avatar-url"}
          alt={perfil?.username || "Usuário Anônimo"}
          className="w-10 h-10 rounded-full"
        />
        <div>
          <span className="font-semibold text-gray-800">
            {perfil?.nomePerfil || "Usuário Anônimo"}
          </span>
        </div>
      </div>
      <div className="flex gap-2">
        {!editando ? (
          <>
            <button
              onClick={editarComentario}  // Abre o campo de edição
              className="text-blue-500 hover:text-blue-700 text-sm"
            >
              Editar
            </button>
            {post.username === usernameLogado && (
              <button
                onClick={() => deletarComentario(post)}
                className="text-red-500 hover:text-red-700 text-sm"
              >
                Deletar
              </button>
            )}
          </>
        ) : (
          <button
            onClick={salvarEdicao}  // Salva a edição e sai do modo de edição
            className="text-green-500 hover:text-green-700 text-sm"
          >
            Salvar
          </button>
        )}
      </div>
    </div>
    {editando ? (
      <textarea
        value={novoComentario}
        onChange={(e) => setNovoComentario(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded-md"
      />
    ) : (
      <p className="break-words text-left">{post.coment}</p>
    )}
    <span className="text-sm text-gray-500">{dataHora}</span>
  </div>
);
};

export default Comentario;
