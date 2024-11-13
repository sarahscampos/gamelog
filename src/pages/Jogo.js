import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Avaliacao from "../components/Avaliacao";
import capa from "../assets/img/marioKart.jpg";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from "../components/Footer"

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
    sumario: "Mario Kart 8 (マリオカート8 Mario Kāto Aito?) é um jogo de corrida de karts desenvolvido e publicado pela Nintendo para o Wii U. É o décimo primeiro título da franquia Mario Kart, o oitavo da série principal (como o título sugere) e foi lançado em 30 de Maio de 2014. O jogo tem como principal novidade os circuitos antigravitacionais e pistas antigas dos jogos anteriores. Assim como os jogos anteriores, possui modos um jogador e multijogador local e online.",
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
        <button class="text-lg flex items-center gap-2 px-8 py-2 rounded-md bg-indigo-500 text-white hover:bg-indigo-400 font-inter" onClick={() => toast.success(`${dadosJogo.nome} foi adicionado à lista!`)}>
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
      <h2 class = "text-sm sm:text-lg">{dadosJogo.dataLancamento}</h2>
      </div>
      <div class = "flex justify-between text-sm sm:text-lg font-medium">
        <h2 class = "text-sm sm:text-lg">Desenvolvedora</h2>
        <h2 class = "text-sm sm:text-lg">{dadosJogo.desenvolvedora}</h2>
      </div>
      <div class = "flex justify-between text-sm sm:text-lg font-medium">
        <h2 class = "text-sm sm:text-lg">Distribuidora</h2>
        <h2 class = "text-sm sm:text-lg">{dadosJogo.distribuidora}</h2>
      </div>

      {/* <hr class="border-2"> */}
    </div>
  </section>

  <section class="bg-zinc-300 mx-auto my-5 px-10 text-left md:px-64 py-20">
    <h2 class="text-2xl p-4 font-bold font-inter">Sumário</h2>
      <div class="flex space-x-4 p-4 w-full">
        <p>
          {dadosJogo.sumario}
        </p>
      </div>
    
  </section>
    
  <section>
    <Avaliacao/>
    <div style ={{ textAlign: 'right', paddingRight: '250px'}}>
            <a href="" class="px-4 py-2 rounded-lg bg-indigo-500 text-white hover:bg-indigo-400 font-inter">Ver mais avaliações</a>
          </div>
  </section>

  <section>
        <div class="mx-auto my-0 px-10 text-center md:px-64 py-20"> 
      <div class="flex items-center gap-2 flex-col py-4 px-8 bg-gradient-to-tl from-indigo-500 to-cyan-600 rounded-lg w-full mb-8">
        
        <a href="forum.html" class="text-white text-2xl px-4 py-2 font-inter font-bold underline decoration-solid"> Acesse o fórum do Grand Theft Auto V</a>
        <p class="text-gray-300 text-md"> Converse • Tire dúvidas • Compartilhe curiosidades</p>

      </div>

    </div>
  </section>

    <Footer/>
    </>
  );
}

export default Jogo;