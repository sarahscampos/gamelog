import React, {useState, useEffect} from 'react'
import { Link, useNavigate } from "react-router-dom";
import BarraPesquisa from '../components/BarraPesquisa';
import Carrossel from '../components/Carrossel';
import background from "../assets/img/backgroundJogo.png";
import logo from "../assets/img/logoGAMELOG2.svg";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";


export const Home = ({dados}) => {

  const navigate = useNavigate();
  
  return (
    <>
    <section style={{backgroundImage: `url(${background})`}} className=" bg-fixed w-full mx-auto my-0 px-10 md:px-64 py-20 font-fira text-white">

      <div className='flex flex-col items-center gap-5 mb-10'>
        <img src={logo} alt="logoGamelog" className="w-16"/>
        <h1 className='text-4xl font-inter font-bold text-center'>GAMELOG</h1>
      </div>
      <BarraPesquisa dados={dados}/>

      <div className='flex flex-col items-center gap-4'>
        <p className='text-center'>Conecte-se, organize seus jogos e compartilhe suas experiências com a comunidade gamer.</p>
        <p className='text-center underline decoration-solid font-bold'>Novo por aqui?</p>
        <Link to="/cadastro" className='bg-indigo-600 p-3 rounded-md font-inter font-bold hover:bg-indigo-700 transition-all duration-300'>Cadastre-se</Link>
      </div>

    </section>

    <section className='mt-16'>
      <h2 className='text-3xl font-inter font-bold text-center text-cyan-800'>Jogos Populares</h2>
      <Carrossel jogos={dados}/>
  
      
    </section>


    <section className='mt-16'>
      <h2 className='text-3xl font-inter font-bold text-center text-cyan-800'>Jogos em Alta</h2>
      <Carrossel jogos={dados}/>
  
      
    </section>

    <section className="flex w-full mx-auto my-0 px-0 md:px-64 py-20 font-fira text-white">
  <Link
    to="/Suporte"
    className="flex items-center justify-center bg-indigo-600 p-3 rounded-md font-inter font-bold hover:bg-indigo-700 transition-all duration-300 text-white w-40"
  >
    Suporte
  </Link>
  <Link
    to="/Codigo"
    className="flex items-center justify-center bg-indigo-600 p-3 rounded-md font-inter font-bold hover:bg-indigo-700 transition-all duration-300 text-white w-40 ml-4"
  >
    Inserir Código
  </Link>
</section>



    </>
  );
}

export default Home;