import React, { useState, useEffect } from 'react';

const Comentario = ({ post, userId }) => {
  const [user, setUser] = useState(null);
  const dataHora = new Date(post.createdAt).toLocaleString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
  
  {/* pegando o usuario */}
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`http://localhost:3000/perfil/${userId}`);
        if (!response.ok) {
          throw new Error("Erro ao carregar o perfil do usuário");
        }
        const dataUser = await response.json();
        setUser(dataUser);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUser();
  }, [userId]); // reexecutar o fetch se mudar

  if (!user) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="p-4 bg-white border border-gray-200 rounded-md shadow">
      <div className="flex text-wrap items-center gap-3 mb-3">
        <img 
          src={user.avatar || 'default-avatar-url'} // Defina uma URL padrão caso o avatar não exista
          alt={user.nome || 'Usuário Anônimo'}
          className="w-10 h-10 rounded-full"
        />
        <div>
          <span className="font-semibold text-gray-800">{user.nome || 'Usuário Anônimo'}</span>
        </div>
      </div>
      <p className="break-words">{post.content}</p>
      <span className="text-sm text-gray-500">{dataHora}</span>
    </div>
  );
};

export default Comentario;
