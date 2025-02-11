import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import { saveUser } from '../slices/cadastroSlice';
import { useNavigate } from 'react-router-dom';

// Esquema de validação com Yup
const schema = yup.object().shape({
  nome: yup.string().required('O nome é obrigatório.'),
  email: yup
    .string()
    .email('Insira um email válido.')
    .required('O email é obrigatório.'),
  senha: yup
    .string()
    .min(6, 'A senha deve ter pelo menos 6 caracteres.')
    .required('A senha é obrigatória.'),
});

const Cadastro = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema), // Conecta o Yup ao React Hook Form
  });

  const onSubmit = async (data) => {
    try {
      const response = await fetch('http://localhost:3000/cadastro', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nome: data.nome,
          email: data.email,
          password: data.senha,
        }),
      });

      if (response.ok) {
        alert('Cadastro realizado com sucesso!');
        navigate('/login'); 
      } else {
        const error = await response.json();
        alert(error.message || 'Erro ao cadastrar');
      }
    } catch (error) {
      console.error('Erro ao cadastrar:', error);
      alert(`Erro interno: ${error.message || error}`);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 rounded shadow-md w-96"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Cadastro</h2>

        {/* Campo Nome */}
        <div className="mb-4">
          <label
            htmlFor="nome"
            className="block text-sm font-medium text-gray-700"
          >
            Nome
          </label>
          <input
            type="text"
            id="nome"
            {...register('nome')}
            className={`mt-1 block w-full px-4 py-2 border ${
              errors.nome ? 'border-red-500' : 'border-gray-300'
            } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
          />
          {errors.nome && (
            <p className="text-red-500 text-sm mt-1">{errors.nome.message}</p>
          )}
        </div>

        {/* Campo Email */}
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            {...register('email')}
            className={`mt-1 block w-full px-4 py-2 border ${
              errors.email ? 'border-red-500' : 'border-gray-300'
            } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Campo Senha */}
        <div className="mb-4">
          <label
            htmlFor="senha"
            className="block text-sm font-medium text-gray-700"
          >
            Senha
          </label>
          <input
            type="password"
            id="senha"
            {...register('senha')}
            className={`mt-1 block w-full px-4 py-2 border ${
              errors.senha ? 'border-red-500' : 'border-gray-300'
            } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
          />
          {errors.senha && (
            <p className="text-red-500 text-sm mt-1">{errors.senha.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Cadastrar
        </button>
      </form>
    </div>
  );
};

export default Cadastro;
