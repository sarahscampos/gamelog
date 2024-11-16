import React, { useState, useEffect } from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Jogo from "./pages/Jogo";
import Avaliacoes from "./pages/Avaliacoes";


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
    }
  }

  useEffect(() => {
    dadosJson();
  }, []);

  if (dados.length === 0) {
   return <p>Carregando...</p>;
 }

   return(
       <BrowserRouter>
       <Header/>
        <Routes>
           <Route element = { <Home dados={dados}/> }  path="/" exact />
           <Route element = { <Jogo dados={dados}/> }  path="/jogo/:id" />
           <Route element = { <Avaliacoes/> }  path="/avaliacoes" />
        </Routes>
        <Footer />
       </BrowserRouter>
   )
}

export default AppRoutes;