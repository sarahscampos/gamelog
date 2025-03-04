import React, { useEffect, useState }  from 'react';
import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";
import Loading from './Loading.js'

const Avaliacao = ({dadosAvaliacao}) => {
  
  const [usuario, setUsuario] = useState(null);
  
  {/* pegando o usuario */}
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`http://localhost:3000/perfil/${dadosAvaliacao.username}`);
        if (!response.ok) {
          throw new Error("Erro ao carregar o perfil do usuário");
        }
        const dataUsuario = await response.json();
        setUsuario(dataUsuario);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUser();
  }, [dadosAvaliacao.username]); // reexecutar o fetch se mudar
  if (!usuario) {
    return <Loading />;
  }

  return (
    <>
          <div className="flex flex-col items-center space-x-4 py-8 px-8 bg-indigo-100 rounded-lg w-full mb-8 lg:flex-row">
            <img src={usuario.avatar} alt="Foto do usuário" className="w-16 h-16 ring-4  ring-indigo-600 rounded-full" />
            <div className="flex flex-col gap-2 p-4">
              <p className="text-gray-800 text-sm italic">{usuario.nomePerfil}</p>
              <p className="text-0.8xl text-indigo-600 font-bold font-inter">Nota: {dadosAvaliacao.score}</p>
              <p className="text-md">
                {dadosAvaliacao.comment}
              </p> 
              <div className="flex justify-end"> 
                <AiOutlineLike/> 
                <AiOutlineDislike/> 
              </div> 
            </div> 
          </div> 
    </> 
  ); 
}; 

export default Avaliacao;