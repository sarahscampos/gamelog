// src/components/Comentario.js
import React from 'react';

const Comentario = ({ post }) => {

  const dataHora = new Date(post.createdAt).toLocaleString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className="p-4 bg-white border border-gray-200 rounded-md shadow">
      <div className="flex items-center gap-3 mb-3">
        <img src={"https://cdn.awsli.com.br/2657/2657807/produto/270496847/photo_5094015974415379628_x-4ucvc1908c.jpg"} alt={"Grimm"} className="w-10 h-10 rounded-full" />
        <div>
          <span className="font-semibold text-gray-800">{"Grimm" || 'Usuário Anônimo'}</span>
        </div>
      </div>
      <p>{post.content}</p>
      <span className="text-sm text-gray-500">{dataHora}</span>
    </div>
  );
};

export default Comentario;
