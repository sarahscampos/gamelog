import React, { useEffect, useState }  from 'react';
import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";

const Avaliacao = ({dadosAvaliacao}) => {
  
  const [usuario, setUsuario] = useState(null);
  
  {/* pegando o usuario */}
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`http://localhost:3000/perfil/${dadosAvaliacao.usuario}`);
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
  }, /*[dadosAvaliacao.usuario]*/); // reexecutar o fetch se mudar

  if (!usuario) {
    return <div>Carregando...</div>;
  }

  return (
    <>
          <div className="flex flex-col items-center space-x-4 py-8 px-8 bg-indigo-100 rounded-lg w-full mb-8 lg:flex-row">
            {/* mantem esse || so pra ter os comentarios mockados*/}
            <img src={usuario.avatar} alt="Foto do usuário" className="w-16 h-16 ring-4  ring-indigo-600 rounded-full" />
            <div className="flex flex-col gap-2 p-4">
              <p className="text-gray-800 text-sm italic">{usuario.nome || usuario}</p>
              <p className="text-0.8xl text-indigo-600 font-bold font-inter">Nota: {dadosAvaliacao.nota}</p>
              <p className="text-md">
                {dadosAvaliacao.comentario}
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