import React, { useState, useEffect } from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Listas from "./pages/Listas";
import Home from "./pages/Home";
import Jogo from "./pages/Jogo";
import Avaliacoes from "./pages/Avaliacoes";
import Lista from "./pages/Lista";


import { useSelector, useDispatch } from "react-redux";
import { fetchJogos } from "./slices/jogosSlice";
import { fetchAvaliacoes } from "./slices/avaliacoesSlice";
import { fetchListas } from "./slices/listasSlice";

const AppRoutes = () => {
  const dispatch = useDispatch();

  const jogos = useSelector((state) => state.jogos.dados);
  const jogosStatus = useSelector((state) => state.jogos.status);

  const avaliacoes = useSelector((state) => state.avaliacoes.dados);
  const avaliacoesStatus = useSelector((state) => state.avaliacoes.status);

  const listas = useSelector((state) => state.listas.dados);
  const listasStatus = useSelector((state) => state.listas.status);

  useEffect(() => {
    if (jogosStatus === 'idle') dispatch(fetchJogos());
    if (avaliacoesStatus === 'idle') dispatch(fetchAvaliacoes());
    if (listasStatus === 'idle') dispatch(fetchListas());
  }, [jogosStatus, avaliacoesStatus, listasStatus, dispatch]);

  if (jogosStatus === 'loading' || avaliacoesStatus === 'loading' || listasStatus === 'loading') {
    return <p>Carregando...</p>;
  }

   return(
       <BrowserRouter>
       <Header/>
        <Routes>
           <Route element = { <Home dados={jogos}/> }  path="/" exact />
           <Route element = { <Jogo dados={jogos} avaliacaoInfo={avaliacoes}/> }  path="/jogo/:id" />
           <Route element = { <Avaliacoes avaliacoes={avaliacoes}/> }  path="/avaliacoes/:id" />
           <Route element = { <Listas listas={listas} /> }  path="/listas" />
           <Route element = { <Lista listas={listas} /> }  path="/lista/:id" />
        </Routes>
        <Footer />
       </BrowserRouter>
   )
}

export default AppRoutes;