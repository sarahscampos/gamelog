import React, { useState, useEffect } from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Listas from "./pages/Listas";
import Home from "./pages/Home";
import Jogo from "./pages/Jogo";
import Avaliacoes from "./pages/Avaliacoes";
import Perfil from "./pages/Perfil"
import Lista from "./pages/Lista";
import Suporte from "./pages/Suporte";
import Codigo from "./pages/Codigo";
import ScrollToTop from "./components/ScrollToTop";
import Loading from "./components/Loading";
import Forum from "./pages/Forum";
import Cadastro from "./pages/Cadastro";
import Login from "./pages/Login";
import Ranking from "./pages/Ranking";
import Admin from "./pages/Admin";

import { useSelector, useDispatch } from "react-redux";
import { fetchJogos } from "./slices/jogosSlice";
import { fetchAvaliacoes } from "./slices/avaliacoesSlice";
import { fetchListas } from "./slices/listasSlice";
import { fetchUsuario } from "./slices/usuarioSlice"

const AppRoutes = () => {
  const dispatch = useDispatch();

  const jogos = useSelector((state) => state.jogos.dados);
  const jogosStatus = useSelector((state) => state.jogos.status);

  const avaliacoes = useSelector((state) => state.avaliacoes.dados);
  const avaliacoesStatus = useSelector((state) => state.avaliacoes.status);

  const listas = useSelector((state) => state.listas.dados);
  const listasStatus = useSelector((state) => state.listas.status);

  const usuarioLogado = useSelector((state) => state.perfil.dados);
  const usuarioLogadoStatus = useSelector((state) => state.perfil.status);

  useEffect(() => {
    if (jogosStatus === 'idle') dispatch(fetchJogos());
    if (avaliacoesStatus === 'idle') dispatch(fetchAvaliacoes());
    if (usuarioLogadoStatus === 'idle') dispatch(fetchUsuario("0"));
    if (listasStatus === 'idle') dispatch(fetchListas("0")); // usuarioLogado.id
  }, [jogosStatus, avaliacoesStatus, usuarioLogadoStatus, listasStatus, dispatch]);

  if (jogosStatus === 'loading' || avaliacoesStatus === 'loading' || listasStatus === 'loading') {
    return <Loading />;
  }

   return(
       <BrowserRouter>
       <ScrollToTop />
       <Header/>
        <Routes>
           <Route element = { <Home dados={jogos}/> }  path="/" exact />
           <Route element = { <Jogo dados={jogos} avaliacaoInfo={avaliacoes} listas={listas.listas} usuarioLogado={usuarioLogado}/> }  path="/jogo/:id" />
           <Route element = { <Avaliacoes avaliacoes={avaliacoes}/> }  path="/avaliacoes/:id" />
           <Route element = { <Listas listas={listas.listas} dados={jogos} usuarioLogado={usuarioLogado} /> }  path="/listas" />
           <Route element = { <Lista listas={listas.listas} dados={jogos} /> }  path="/lista/:id" />
           <Route element = { <Suporte/>} path = "/suporte"/>
           <Route element = { <Codigo/>} path = "/codigo"/>
           <Route element = { <Forum dados = {jogos}/>} path = "/forum/:id"/>
           <Route element = { <Cadastro/>} path = "/cadastro"/>;
           <Route element = { <Login/> } path = "/login"/>;
           <Route element = { <Perfil dados={jogos} listas={listas.listas} usuarioLogado={usuarioLogado} />} path = "/perfil/:id"/>
           <Route element = { <Ranking/>} path="/Ranking/"/>
           <Route element={<Admin />} path="/admin" />
        </Routes>
        <Footer />
      </BrowserRouter>
    );
}

export default AppRoutes;