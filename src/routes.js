import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";

import Home from "./pages/Home";
import Jogo from "./pages/Jogo";


const AppRoutes = () => {
   return(
       <BrowserRouter>
        <Routes>
           <Route element = { <Home/> }  path="/" exact />
           <Route element = { <Jogo/> }  path="/jogo" />
        </Routes>
       </BrowserRouter>
   )
}

export default AppRoutes;