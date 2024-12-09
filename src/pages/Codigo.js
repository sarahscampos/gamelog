import React, { useState } from 'react';
import {Helmet} from "react-helmet";

const CupomPromocao = () => {
  const [codigo, setCodigo] = useState(''); // Armazena o código digitado pelo usuário
  const [mensagem, setMensagem] = useState(''); // Armazena a mensagem de validação

  // Simulação de cupons válidos
  const cuponsValidos = ['GAME10', 'SAVE20', 'JOGO30'];

  // Função para validar o cupom
  const validarCupom = () => {
    if (cuponsValidos.includes(codigo.toUpperCase())) {
      setMensagem('Cupom válido! Aproveite sua promoção.');
    } else {
      setMensagem('Cupom inválido. Tente novamente.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-5">
      <Helmet>
          <meta charSet="utf-8" />
          <title>Código</title>
          <link rel="canonical" href="http://mysite.com/example" />
          <meta name="description" content="Página de inserir código" />
        </Helmet>
      <div className="max-w-md w-full bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-indigo-600 mb-4 text-center">Promoção de Jogos</h1>
        <p className="text-sm text-gray-700 mb-6 text-center">
          Insira o código do cupom para desbloquear promoções em jogos de nossas lojas parceiras.
        </p>
        <label htmlFor="codigoCupom" className="block text-gray-800 font-semibold mb-2">
          Código do Cupom:
        </label>
        <input
          type="text"
          id="codigoCupom"
          placeholder="Digite seu código de cupom"
          value={codigo}
          onChange={(e) => setCodigo(e.target.value)}
          className="w-full border border-gray-300 rounded-md p-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-4"
        />
        <button
          onClick={validarCupom}
          className="w-full bg-indigo-600 text-white font-semibold p-3 rounded-md hover:bg-indigo-700 transition duration-300"
        >
          Validar Cupom
        </button>
        {mensagem && (
          <div
            className={`mt-4 text-center p-2 rounded-md ${
              mensagem.includes('inválido')
                ? 'bg-red-100 text-red-600'
                : 'bg-green-100 text-green-600'
            }`}
          >
            {mensagem}
          </div>
        )}
      </div>

    </div>
  );
};

export default CupomPromocao;
