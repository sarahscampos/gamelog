import React, { useState, useEffect } from 'react';
import { RiArrowGoBackFill } from "react-icons/ri";
import Avaliacao from "../components/Avaliacao";
import { useParams, useNavigate } from 'react-router-dom';
import {Helmet} from "react-helmet";

const Avaliacoes = ({avaliacoes}) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [avaliacoesJogo, setAvaliacoesJogo] = useState();

  useEffect(() => {
      fetch(`http://localhost:3000/avaliacoes/${id}`).then((r) => r.json()).then(setAvaliacoesJogo);
    }, [id])

      return (
        <>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Avaliações</title>
          <link rel="canonical" href="http://mysite.com/example" />
          <meta name="description" content="Avaliações do jogo" />
        </Helmet>
        <button onClick={() => navigate(-1)} className="items-center gap-1 inline-flex px-4 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white hover:bg-cyan-600 font-inter mt-5 ml-5 transition-all duration-300">
          <RiArrowGoBackFill />
          Voltar
        </button>
        <section className="mx-auto my-5 px-10 text-left md:px-64 py-10"> 
          <h2 className="text-2xl p-4 font-bold font-inter">Avaliações</h2>
          
          {avaliacoesJogo ? avaliacoesJogo.map((avaliacao, index) => ( //PERGUNTAR PROFESSOR, GAMBIARRA?
            /*TROCAR USERID DPS PELO REAL*/
            <Avaliacao key={index} dadosAvaliacao={avaliacao}/>
          )) : ''}
      
        </section> 
        </>
      );
};

export default Avaliacoes;