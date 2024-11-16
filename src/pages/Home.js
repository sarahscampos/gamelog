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
    breakpoint: { max: 4000, min: 1500 },
    items: 8
  },
  desktop: {
    breakpoint: { max: 1500, min: 1024 },
    items: 5
  },
  tablet: {
    breakpoint: { max: 1024, min: 535 },
    items: 3
  },
  mobile: {
    breakpoint: { max: 535, min: 0 },
    items: 2
  }
};


export const Home = () => {

  const navigate = useNavigate();
  const [dados, setDados] = useState([]);
  async function dadosJson() {
    try {
      const response = await fetch('http://localhost:3000/jogos');
      if (!response.ok) {
        throw new Error('Erro ao carregar o JSON');
      }
      const data = await response.json();
      setDados(data); 
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    dadosJson();
  }, []);

  if (dados.length === 0) {
    return <p>Carregando...</p>;
  }
  return (
    <>
    <section style={{backgroundImage: `url(${background})`}} className=" bg-fixed w-full mx-auto my-0 px-10 md:px-64 py-20 font-fira text-white">

      <div className='flex flex-col items-center gap-5 mb-10'>
        <img src={logo} alt="logoGamelog" className="w-16"/>
        <h1 className='text-4xl font-inter font-bold text-center'>GAMELOG</h1>
      </div>
      <BarraPesquisa/>

      <div className='flex flex-col items-center gap-4'>
        <p className='text-center'>Conecte-se, organize seus jogos e compartilhe suas experiências com a comunidade gamer.</p>
        <p className='text-center underline decoration-solid font-bold'>Novo por aqui?</p>
        <Link to="/cadastro" className='bg-indigo-600 p-3 rounded-md font-inter font-bold hover:bg-indigo-700 transition-all duration-300'>Cadastre-se</Link>
      </div>

    </section>

    <section className='mt-16'>
      <h2 className='text-3xl font-inter font-bold text-center text-cyan-800'>Jogos Populares</h2>
    <Carousel responsive={responsive} removeArrowOnDeviceType={["tablet", "mobile"]} className='p-10'>
      {dados.map((item, index) => (
        <div key={index} className='w-40 drop-shadow-md' onClick={() => navigate(`/jogo/${item.id}`)}>
          <img src={item.capa} alt="logoGamelog" className='mb-1 ring-solid ring-2 ring-indigo-600 rounded-md' />
          <p className='text-center font-fira text-base'>{item.nome}</p>
          
        </div>
      ))}
    </Carousel>
  
      
    </section>

    
    </>
  );
}

export default Home;