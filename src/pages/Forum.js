// src/pages/Forum.js
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { addPost } from '../slices/forumSlice';
import Comentario from '../components/Comentario';

const Forum = ({dados}) => {
  const { id } = useParams();
  const numericId = parseInt(id, 10);

  const [newPost, setNewPost] = useState('');
  const posts = useSelector((state) => state.forum.jogos[id] || []);
  const dispatch = useDispatch();

  const handleAddPost = (event) => {
    event.preventDefault();
    if (newPost.trim() !== '' && newPost.length < 512) {
      // Adicionando a data de criação ao post
      dispatch(addPost({
        jogoId: id,
        post: {
          id: Date.now(),
          content: newPost,
          createdAt: new Date(), // Armazenando a data de criação
        },
      }));
      setNewPost('');
    }
    else{
      return alert("O comentário não pode estar vazio ou ultrapassar 512 caracteres")
    }
  };

  return (
    <>
    <div className="p-6 bg-gray-100 min-h-screen">
    {dados[numericId] ?
      <div className="flex flex-col items-center m-10">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-6 font-inter">Fórum de {dados[numericId].nome}</h1>
        <img src={`${dados[numericId].capa}`} alt={dados[numericId].nome} className="w-52 h-72 ring-4 ring-indigo-700 rounded-md mb-6 lg:h-96 lg:w-72" />
      </div> : (<div></div>) }

      <div className="max-w-2xl mx-auto text-right">
        <textarea
          className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
          placeholder="Digite sua mensagem..."
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
        ></textarea>
        <button
          className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          onClick={(event) => handleAddPost(event)}
        >
          Enviar
        </button>

        <div className="mt-6 space-y-4">
          {posts
            .slice()
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) // Ordenando os posts pela data mais recente
            .map((post) => (
              <Comentario key={post.id} post={post} />
            ))}
        </div>
      </div>
    </div>
    </>
  );
};

export default Forum;
