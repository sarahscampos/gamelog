import React, {useState, useEffect} from 'react'
import { Link, useNavigate } from "react-router-dom";
import BarraPesquisa from '../components/BarraPesquisa';
import background from "../assets/img/backgroundJogo.png";
import logo from "../assets/img/logoGAMELOG2.svg";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";






const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 1990 },
    items: 8
  },
  desktop: {
    breakpoint: { max: 1990, min: 1200 },
    items: 5
  },
  tablet: {
    breakpoint: { max: 1200, min: 750 },
    items: 4
  },
  mobile: {
    breakpoint: { max: 750, min: 550 },
    items: 3
  },
  mobileS: {
    breakpoint: { max: 550, min: 0 },
    items: 2
  }

};


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
    <Carousel responsive={responsive} removeArrowOnDeviceType={["mobile"]} className='p-10'>
      {dados.map((item, index) => (
        <div key={index} className='w-40 drop-shadow-md cursor-pointer hover:scale-105 transition lg:w-56' onClick={() => navigate(`/jogo/${item.id}`)}>
          <img src={item.capa} alt="logoGamelog" className='mb-1 ring-solid ring-2 ring-indigo-600 rounded-sm' />
          <p className='text-center font-fira text-base'>{item.nome}</p>
          
        </div>
      ))}
    </Carousel>
  
      
    </section>


    <section className='mt-16'>
      <h2 className='text-3xl font-inter font-bold text-center text-cyan-800'>Jogos em Alta</h2>
    <Carousel responsive={responsive} removeArrowOnDeviceType={["mobile"]} className='p-10'>
      {dados.map((item, index) => (
        <div key={index} className='w-40 drop-shadow-md cursor-pointer hover:scale-105 transition lg:w-56' onClick={() => navigate(`/jogo/${item.id}`)}>
          <img src={item.capa} alt="logoGamelog" className='mb-1 ring-solid ring-2 ring-indigo-600 rounded-sm' />
          <p className='text-center font-fira text-base'>{item.nome}</p>
          
        </div>
      ))}
    </Carousel>
  
      
    </section>

    
    </>
  );
}

export default Home;