import React from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import CarrosselEdit from '../components/CarrosselEdit';
import { RiArrowGoBackFill } from "react-icons/ri";
import {Helmet} from "react-helmet";


const Lista = ({listas, dados}) => {
  const { username, idLista } = useParams();

  const navigate = useNavigate();

  console.log(username)
  console.log(idLista)
  function obtemJogos(idLista){
    // Encontra a lista correspondente ao idLista
   const listaEncontrada = listas.find((lista) => lista._id === idLista);
   
   if (!listaEncontrada || !listaEncontrada.jogosIds) {
     // Retorna um array vazio se a lista não for encontrada ou não tiver jogos
     return [];
   }
 
   // Filtra os jogos que correspondem aos IDs em jogosIds
   const jogosDaLista = dados.filter((jogo) =>
     listaEncontrada.jogosIds.includes(jogo._id)
   );
   console.log(jogosDaLista);
 
   console.log(jogosDaLista); // Verifica os jogos retornados no console
   return jogosDaLista;
   }
  const jogosLista = obtemJogos(idLista); 

  return (
    <>
    
      <section className='ml-5 mr-5 min-h-dvh'>
      <button onClick={() => navigate(-1)} /*bug de não ter pagina anterior?*/className="items-center gap-1 inline-flex px-4 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white hover:bg-cyan-600 font-inter mt-5 ml-5 transition-all duration-300">
          <RiArrowGoBackFill />
          Voltar
        </button>
    {
      listas ? ( //tem algum jeito melhor de fazer essas verificações?

        <div className="mt-16">
           
              <div key={username} className="flex flex-col">
                <h2  className="text-2xl font-bold font-inter flex items-center gap-5">
                  {console.log(listas)}
                  <Helmet>
                    <meta charSet="utf-8" />
                    <title>{`Lista`}</title>
                    <link rel="canonical" href="http://mysite.com/example" />
                    <meta name="description" content="Página de jogo" />
                  </Helmet>
                </h2>
                <CarrosselEdit jogos={jogosLista} id={idLista} />
              </div>
  
          
        </div>
      ) : <p className='font-fira p-5 text-lg text-red-700'>Não foi possível carregar a lista</p>
    }
    </section>
    </>
    

  )
}

export default Lista;