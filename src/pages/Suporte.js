import React from "react";

const Suporte = () => {
    return(
        <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
        {/* Título */}
        <h1 className="text-4xl font-medium text-gray-800 mb-8">Suporte ao Jogador</h1>
  
        {/* Bloco de Pesquisa */}
        <div className="w-full max-w-2xl bg-white shadow-md rounded-lg p-6 mb-10 ">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Como podemos ajudar você?</h2>
          <input
            type="text"
            placeholder="Digite sua dúvida..."
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
          />
          <button className="mt-4 w-full bg-indigo-600 text-white py-2 rounded-md font-bold hover:bg-indigo-700 transition-all">
            Pesquisar
          </button>
        </div>
  
        {/* Aba de Dúvidas Mais Frequentes */}
        <div className="w-full max-w-3xl bg-white shadow-md rounded-lg p-6 mb-10">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Dúvidas Frequentes</h2>
          <ul className="space-y-4">
            <li className="p-3 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800">Como recupero minha conta?</h3>
              <p className="text-gray-600">Acesse a página de recuperação e siga os passos para redefinir sua senha.</p>
            </li>
            <li className="p-3 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800">O que fazer se meu jogo não estiver funcionando?</h3>
              <p className="text-gray-600">
                Certifique-se de que seu dispositivo atende aos requisitos mínimos e tente reinstalar o jogo.
              </p>
            </li>
            <li className="p-3">
              <h3 className="text-lg font-semibold text-gray-800">Como entrar em contato com o suporte?</h3>
              <p className="text-gray-600">Use os canais de contato abaixo para falar diretamente com nossa equipe.</p>
            </li>
          </ul>
        </div>
  
        {/* Contato */}
        <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Entre em Contato</h2>
          <p className="text-gray-700">
            <strong>Telefone:</strong> <span className="text-indigo-600 font-bold">0800-123-456</span>
          </p>
          <p className="text-gray-700">
            <strong>Email:</strong> <a href="mailto:suporte@jogos.com" className="text-indigo-600 underline">suporte@jogos.com</a>
          </p>
        </div>
      </div>
    );
  };

export default Suporte;