// src/pages/Forum.js
import React, { useState } from 'react';
import { useSelector, useDispatch} from 'react-redux';
import { useParams } from 'react-router-dom';
import Comentario from '../components/Comentario';
import {addForumComent} from '../slices/forumSlice';
import {useEffect} from 'react'


const Forum = ({dados}) => {
  const { id } = useParams();

  const usernameLogado = useSelector((state) => state.auth?.user?.username);

  const [newPost, setNewPost] = useState('');
  const [jogo, setJogo] = useState(null);
  const [comentarios, setComentarios] = useState('');

  const posts = useSelector((state) => state.forum.jogos[id] || []);

  const dispatch = useDispatch();

  const handleAddPost = (event) => {
    event.preventDefault();
    if (newPost.trim() !== '' && newPost.length < 512) {
      if(!usernameLogado){
        return alert("Usuário não está logado."); // bota um toast bonitinho
      }
        dispatch(addForumComent({
          jogoId: id,
          username: usernameLogado,
          coment: newPost,
        }));
        setNewPost('');
    }
    else{
      return alert("O comentário não pode estar vazio ou ultrapassar 512 caracteres")
    }
  };

  useEffect(() => {
    const fetchJogo= async () => {
        const responseJogo = await fetch(`http://localhost:3000/jogo/${id}`);
        if (!responseJogo.ok) throw new Error("Erro ao carregar o jogo");
        const dataJogo = await responseJogo.json();
        setJogo(dataJogo);

        const responseComentarios = await fetch(`http://localhost:3000/forum/${id}`);
        if (!responseComentarios.ok) throw new Error("Erro ao carregar os comentarios do forum");
        const dataComentarios = await responseComentarios.json();
        setComentarios(dataComentarios);
    };
    fetchJogo();
  },  [id]);

  return (
    <>
    <div className="p-6 bg-gray-100 min-h-screen">
    {jogo ?
      <div className="flex flex-col items-center m-10">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-6 font-inter">Fórum de {jogo.nome}</h1>
        <img src={`${jogo.capa}`} alt={jogo.nome} className="w-52 h-72 ring-4 ring-indigo-700 rounded-md mb-6 lg:h-96 lg:w-72" />
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
          {
          comentarios ? comentarios.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .map((post, index) => (
              <Comentario key={index} post={post} />
            )): null }
            
            
        </div>
      </div>
    </div>
    </>
  );
};

export default Forum;
