import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Jogo from "./pages/Jogo";
import Avaliacoes from "./pages/Avaliacoes";


const AppRoutes = () => {
   return(
       <BrowserRouter>
       <Header/>
        <Routes>
           <Route element = { <Home/> }  path="/" exact />
           <Route element = { <Jogo/> }  path="/jogo" />
           <Route element = { <Avaliacoes/> }  path="/avaliacoes" />
        </Routes>
        <Footer />
       </BrowserRouter>
   )
}

export default AppRoutes;