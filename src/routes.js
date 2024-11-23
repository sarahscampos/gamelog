import React, { useState, useEffect } from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Listas from "./pages/Listas";
import Home from "./pages/Home";
import Jogo from "./pages/Jogo";
import Avaliacoes from "./pages/Avaliacoes";
import Suporte from "./pages/Suporte";


const AppRoutes = () => {
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
      console.log("oi");
    }
  }

  const [dadosAvaliacoes, setDadosAvaliacoes] = useState([]);
  async function dadosAvaliacoesJson() {
    try {
      const response = await fetch('http://localhost:3000/avaliacoes');
      if (!response.ok) {
        throw new Error('Erro ao carregar o JSON');
      }
      const data = await response.json();
      setDadosAvaliacoes(data); 
    } catch (error) {
      console.error(error);
    }
  }

  const [dadosDuvidas, setDadosDuvidas] = useState([]);
  async function dadosDuvidasJson() {
    try {
      const response = await fetch('http://localhost:3000/duvidas');
      if (!response.ok) {
        throw new Error('Erro ao carregar o JSON');
      }
      const data = await response.json();
      setDadosDuvidas(data); 
    } catch (error) {
      console.error(error);
    }
  }

  const [dadosListas, setDadosListas] = useState([]);
  async function dadosListasJson() {
    try {
      const response = await fetch('http://localhost:3000/listas');
      if (!response.ok) {
        throw new Error('Erro ao carregar o JSON');
      }
      const data = await response.json();
      setDadosListas(data); 
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    dadosJson();
    dadosAvaliacoesJson();
    dadosListasJson();
    dadosDuvidasJson();
  }, []);

  if (dados.length === 0) {
   return <p>Carregando...</p>;
 }

 if (!dados) {
  return <p>Carregando...</p>;
}

   return(
       <BrowserRouter>
       <Header/>
        <Routes>
           <Route element = { <Home dados={dados}/> }  path="/" exact />
           <Route element = { <Jogo dados={dados} avaliacaoInfo={dadosAvaliacoes}/> }  path="/jogo/:id" />
           <Route element = { <Avaliacoes avaliacoes={dadosAvaliacoes}/> }  path="/avaliacoes/:id" />
           <Route element = { <Listas listas={dadosListas} /> }  path="/listas" />
           <Route element = { <Suporte/>} path = "/Suporte"/>
        </Routes>
        <Footer />
       </BrowserRouter>
   )
}

export default AppRoutes;