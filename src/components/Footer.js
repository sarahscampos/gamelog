import React from 'react';
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <>
    <footer className="bg-cyan-600 px-10 py-5 font-inter">
      <section className="flex font-fira text-white justify-center mb-5">
        <Link
          to="/suporte"
          className="flex items-center justify-center bg-indigo-600 p-3 rounded-md font-inter font-bold hover:bg-indigo-700 transition-all duration-300 text-white w-40"
        >
          Suporte
        </Link>
        <Link
          to="/codigo"
          className="flex items-center justify-center bg-indigo-600 p-3 rounded-md font-inter font-bold hover:bg-indigo-700 transition-all duration-300 text-white w-40 ml-4"
        >
          Inserir Código
        </Link>
      </section>
        <p className="text-white text-center">Desenvolvido por Caio P., João K., Erich J., Renato A. e Sarah C.</p>
    </footer>
    </>
    
  )
}

export default Footer;


