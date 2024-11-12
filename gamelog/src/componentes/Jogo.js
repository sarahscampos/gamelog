import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "./Header";
import Avaliacao from "./Avaliacao";
import capa from "../assets/img/marioKart.jpg";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Jogo = () => {

  const dadosJogo = {
    nome: "Mario Kart",
    colocacao: 5,
    nota: 10,
    capa: capa,
    dataLancamento: "17/09/2013",
    desenvolvedora: "Rockstar North",
    distribuidora: "Rockstar Games",
    generos: ["ação", "aventura", "tiro"],
  }


  const navigate = useNavigate();


  return (
    <>
    <Header/>
    <section class ="w-full bg-zinc-600 mx-auto my-0 px-10 md:px-64 py-20">

    <div class="flex justify-between">
      <button onClick={() => navigate(-1)} /*bug de não ter pagina anterior?*/class="items-center gap-1 inline-flex px-4 py-2 rounded-lg border-2 border-cyan-600 text-white hover:bg-cyan-600 font-inter">
        Voltar
      </button>
      <Link to='/' class="items-center gap-1 inline-flex px-4 py-2 rounded-lg border-2 border-cyan-600 text-white hover:bg-cyan-600 font-inter">Ranking {dadosJogo.colocacao}</Link>
    </div>

    <div class="flex flex-col items-center m-10">
        <img src={dadosJogo.capa} alt="capaJogo" className="w-29 ring-4 ring-indigo-700 rounded-md"/>
        <h2 class ="text-xl sm:text-2xl lg:text-3xl font-inter font-bold text-white mb-3">{dadosJogo.nome}</h2>
        <p class="text-white rounded bg-gradient-to-tl from-indigo-500 to-cyan-600 px-5 py-2">Nota média: {dadosJogo.nota}</p>

      </div>
      <div class="flex justify-center mt-16">
        <button class="text-lg flex items-center gap-2 px-8 py-2 rounded-md bg-indigo-500 text-white hover:bg-indigo-400 font-inter" onclick={toast("teste")}>
          Adicionar à lista
        </button>
        <ToastContainer />
      </div>
  </section>
  
  <section class="mx-auto my-0 px-10 md:px-64 py-20">

  <div class="flex flex-col gap-3 mt-7">
    <div class = "flex space-x-4 mb-7">
      <p class = "text-lg font-medium text-white px-3 py-1 rounded bg-zinc-500 ">Ação</p>
      <p class = "text-lg font-medium text-white bg-zinc-500 px-3 py-1 rounded">Aventura</p>
      <p class = "text-lg font-medium text-white bg-zinc-500 px-3 py-1 rounded">Tiro</p>
    </div>

    {/* <hr class="border-2"> */}
    <div class = "flex justify-between text-sm sm:text-lg font-medium">
    <h2 class = "text-sm sm:text-lg">Data de lançamento</h2>
    <h2 class = "text-sm sm:text-lg">17/09/2013</h2>
    </div>
    <div class = "flex justify-between text-sm sm:text-lg font-medium">
      <h2 class = "text-sm sm:text-lg">Desenvolvedora</h2>
      <h2 class = "text-sm sm:text-lg">Rockstar North</h2>
    </div>
    <div class = "flex justify-between text-sm sm:text-lg font-medium">
      <h2 class = "text-sm sm:text-lg">Distribuidora</h2>
      <h2 class = "text-sm sm:text-lg">Rockstar Games</h2>
    </div>

    {/* <hr class="border-2"> */}
  </div>

  </section>
    
    <Link to="/">Home</Link>


    {/* <Avaliacao /> */}
    </>
  );
}

export default Jogo;