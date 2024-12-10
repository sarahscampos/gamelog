import React from 'react'
import { RiArrowGoBackFill } from "react-icons/ri";
import Avaliacao from "../components/Avaliacao";
import { useParams, useNavigate } from 'react-router-dom';
import {Helmet} from "react-helmet";

const Avaliacoes = ({avaliacoes}) => {
  const { id } = useParams();
  const navigate = useNavigate();

      return (
        <>
        <Helmet> 
          <meta charSet="utf-8" /> 
          <title>Avaliações</title> 
          <link rel="canonical" href="http://mysite.com/example" /> 
          <meta name="description" content="Avaliações do jogo" /> 
        </Helmet> 
        <button onClick={() => navigate(-1)}
        className="items-center gap-1 inline-flex px-4 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white hover:bg-cyan-600 font-inter mt-5 ml-5 transition-all duration-300">
          <RiArrowGoBackFill />
          Voltar
        </button>
        <section className="mx-auto my-5 px-10 text-left md:px-64 py-10"> 
          <h2 className="text-2xl p-4 font-bold font-inter">Avaliações</h2>
          
          {avaliacoes[id] ? avaliacoes[id].map((avaliacao, index) => (
            <Avaliacao key={index} dadosAvaliacao={avaliacao} /> 
          )) : ''} 
      
        </section> 
        </>
      );
};

export default Avaliacoes;